import React, { useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useTheme } from "../theme/ThemeContext";
import Card from "../components/Card";
import Button from "../components/Button";
import StatusBanner from "../components/StatusBanner";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../services/firebase";
import { generateToken } from "../services/tokenService";

type Hospital = {
  id: string;
  name: string;
  rating?: string;
  distance?: string;
  wait?: string;
  image?: string;
};


const hospitals: Hospital[] = [
  {
    id: "1",
    name: "Apollo Hospital",
    rating: "4.8",
    distance: "2.1 km",
    wait: "15 min",
  },
  {
    id: "2",
    name: "Fortis Hospital",
    rating: "4.7",
    distance: "3.5 km",
    wait: "20 min",
  },
];


const departments = [
  "Cardiology",
  "Orthopedics",
];


const doctors = [
  {
    id:"1",
    name:"Dr. Neha Singh",
  },
  {
    id:"2",
    name:"Dr. Priya Menon",
  },
];


const modes = [
  "Clinic Visit",
  "Video Consultation",
];


const dates = [
  "Today",
  "Tomorrow",
  "Next Week",
];


const times = [
  "09:00 AM",
  "11:30 AM",
  "04:00 PM",
];


type Step = 1|2|3|4|5|6;


type Props = {
  onOpenToken: () => void;
};

export default function AppointmentBookingScreen({
  onOpenToken,
}: Props){

const {colors}=useTheme();


const [step,setStep]=useState<Step>(1);

const [hospital,setHospital]=useState(hospitals[0]);

const [department,setDepartment]=useState(departments[0]);

const [doctor,setDoctor]=useState(doctors[0]);

const [mode,setMode]=useState(modes[0]);

const [date,setDate]=useState(dates[0]);

const [time,setTime]=useState(times[0]);

const [message,setMessage]=useState("");


const reviewText = useMemo(()=>`

Hospital: ${hospital.name}

Department: ${department}

Doctor: ${doctor.name}

Visit Type: ${mode}

Date: ${date}

Time: ${time}

`,[
hospital,
department,
doctor,
mode,
date,
time
]);

const confirm = async () => {
  console.log("generateToken function called");
  try {

    const token = await generateToken(
      hospital.id,
      hospital.name,
      doctor.id,
      doctor.name,
      department,
      mode,
      date,
      time
    );

    setMessage(
      `Appointment Confirmed!\n\nToken: ${token.tokenNumber}`
    );

    setTimeout(() => {
      onOpenToken();
    }, 1000);

  } catch (error) {
    console.log(error);
    setMessage("Booking Failed");
  }
};





return(

<ScrollView
style={[
styles.container,
{
backgroundColor:colors.background
}
]}
>


<Text
style={[
styles.title,
{
color:colors.text
}
]}
>
Appointment Booking
</Text>



{message?
<StatusBanner 
message={message}
tone="success"
/>
:null}



<Card style={styles.card}>


<Text
style={[
styles.stepText,
{
color:colors.primary
}
]}
>
Step {step} of 6
</Text>



{step===1 && (

<View>

<Text style={styles.sectionTitle}>
Select Hospital
</Text>


{hospitals.map(item=>(

<TouchableOpacity
key={item.id}
onPress={()=>setHospital(item)}
style={styles.option}
>


<Text>
{item.name}
</Text>


</TouchableOpacity>

))}


</View>

)}





{step===2 && (

<View>

<Text style={styles.sectionTitle}>
Select Department
</Text>


{departments.map(item=>(

<TouchableOpacity
key={item}
onPress={()=>setDepartment(item)}
style={styles.option}
>

<Text>{item}</Text>

</TouchableOpacity>

))}

</View>

)}





{step===3 && (

<View>

<Text style={styles.sectionTitle}>
Select Doctor
</Text>


{doctors.map(item=>(

<TouchableOpacity
key={item.id}
onPress={()=>setDoctor(item)}
style={styles.option}
>

<Text>
{item.name}
</Text>

</TouchableOpacity>

))}


</View>

)}





{step===4 && (

<View>

<Text style={styles.sectionTitle}>
Visit Type
</Text>


{modes.map(item=>(

<TouchableOpacity
key={item}
onPress={()=>setMode(item)}
style={styles.option}
>

<Text>{item}</Text>

</TouchableOpacity>

))}


</View>

)}





{step===5 && (

<View>

<Text style={styles.sectionTitle}>
Date & Time
</Text>


{dates.map(item=>(

<TouchableOpacity
key={item}
onPress={()=>setDate(item)}
style={styles.option}
>

<Text>{item}</Text>

</TouchableOpacity>

))}



{times.map(item=>(

<TouchableOpacity
key={item}
onPress={()=>setTime(item)}
style={styles.option}
>

<Text>{item}</Text>

</TouchableOpacity>

))}


</View>

)}





{step===6 && (

<View>

<Text style={styles.sectionTitle}>
Review & Confirm
</Text>


<Text>
{reviewText}
</Text>


</View>

)}



</Card>



<View style={styles.actions}>


<Button
  title="Back"
  onPress={() =>
    setStep((prev) =>
      prev > 1 ? (prev - 1) as Step : prev
    )
  }
/>



{
step<6?

<Button
  title="Next"
  onPress={() =>
    setStep((prev) =>
      prev < 6 ? (prev + 1) as Step : prev
    )
  }
/>

:

<Button
title="Confirm"
onPress={confirm}
/>

}



</View>



</ScrollView>


);

}



const styles=StyleSheet.create({

container:{
flex:1,
padding:20
},

title:{
fontSize:24,
fontWeight:"800"
},

card:{
marginTop:20
},

stepText:{
fontWeight:"700"
},

sectionTitle:{
fontSize:18,
fontWeight:"700",
marginVertical:15
},

option:{
padding:15,
backgroundColor:"#eee",
borderRadius:10,
marginBottom:10
},

actions:{
flexDirection:"row",
justifyContent:"space-between",
marginTop:20
}

});