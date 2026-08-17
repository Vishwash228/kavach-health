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
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

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


import HeaderBar from "../components/HeaderBar";

type Props = {
  onOpenToken: () => void;
  onBack?: () => void;
};

export default function AppointmentBookingScreen({
  onOpenToken,
  onBack,
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
const [loading, setLoading] = useState(false);


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
  if (loading) return;

  setLoading(true);
  setMessage("");

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

    await addDoc(collection(db, "appointments"), {
      hospitalId: hospital.id,
      hospitalName: hospital.name,

      doctorId: doctor.id,
      doctorName: doctor.name,

      department,
      mode,
      date,
      time,

      tokenNumber: token.tokenNumber,

      consultationFee: 0,
      platformFee: 0,
      totalAmount: 0,

      status: "confirmed",

      createdAt: serverTimestamp(),
    });

    setMessage(
      `✅ Appointment Confirmed!

Hospital: ${hospital.name}

Doctor: ${doctor.name}

Department: ${department}

Date: ${date}

Time: ${time}

🎟 Token: ${token.tokenNumber}

💰 Total: ₹0`
    );

    setTimeout(() => {
      onOpenToken();
    }, 1500);

  } catch (error) {
    console.log("Booking Error:", error);

    setMessage(
      "❌ Booking failed. Please check your Firebase connection and try again."
    );
  } finally {
    setLoading(false);
  }
};





return(
<View style={{ flex: 1, backgroundColor: colors.background }}>
<HeaderBar title="Appointment Booking" onBack={onBack} subtitle="Book doctor visits & consultation" />
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
<Card style={styles.doctorCard}>
  <Text style={styles.doctorTitle}>👨‍⚕️ Selected Doctor</Text>

  <Text style={styles.doctorName}>{doctor.name}</Text>

  <Text style={styles.doctorInfo}>🏥 {hospital.name}</Text>

  <Text style={styles.doctorInfo}>🩺 {department}</Text>

  <Text style={styles.doctorInfo}>⏰ {time}</Text>
</Card>


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
{hospitals.map((item) => (

  <TouchableOpacity
    key={item.id}
    onPress={() => setHospital(item)}
    style={[
      styles.option,
      hospital.id === item.id && {
        backgroundColor: colors.primary,
      },
    ]}
  >

    <Text
      style={{
        color: hospital.id === item.id ? "#fff" : colors.text,
        fontWeight: "700",
      }}
    >
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
  onPress={() => setDepartment(item)}
  style={[
    styles.option,
    department === item && {
      backgroundColor: colors.primary,
    },
  ]}
>
  <Text
    style={{
      color: department === item ? "#fff" : colors.text,
      fontWeight: "700",
    }}
  >
    {item}
  </Text>
</TouchableOpacity>

))}

</View>

)}
{step === 3 && (
  <View>
    <Text style={styles.sectionTitle}>
      Select Doctor
    </Text>

    {doctors.map((item) => (
      <TouchableOpacity
        key={item.id}
        onPress={() => setDoctor(item)}
        style={[
          styles.option,
          doctor.id === item.id && {
            backgroundColor: colors.primary,
          },
        ]}
      >
        <Text
          style={{
            color:
              doctor.id === item.id
                ? "#fff"
                : colors.text,
            fontWeight: "700",
          }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
)} 
{step === 4 && (
  <View>
    <Text style={styles.sectionTitle}>
      Visit Type
    </Text>

    {modes.map((item) => (
      <TouchableOpacity
        key={item}
        onPress={() => setMode(item)}
        style={[
          styles.option,
          mode === item && {
            backgroundColor: colors.primary,
          },
        ]}
      >
        <Text
          style={{
            color: mode === item ? "#fff" : colors.text,
            fontWeight: "700",
          }}
        >
          {item}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
)}

{step === 5 && (
  <View>
    <Text style={styles.sectionTitle}>
      Select Date
    </Text>

    {dates.map((item) => (
      <TouchableOpacity
        key={item}
        onPress={() => setDate(item)}
        style={[
          styles.option,
          date === item && {
            backgroundColor: colors.primary,
          },
        ]}
      >
        <Text
          style={{
            color: date === item ? "#fff" : colors.text,
            fontWeight: "700",
          }}
        >
          {item}
        </Text>
      </TouchableOpacity>
    ))}

    <Text
      style={[
        styles.sectionTitle,
        {
          marginTop: 20,
        },
      ]}
    >
      Select Time
    </Text>

    {times.map((item) => (
      <TouchableOpacity
        key={item}
        onPress={() => setTime(item)}
        style={[
          styles.option,
          time === item && {
            backgroundColor: colors.primary,
          },
        ]}
      >
        <Text
          style={{
            color: time === item ? "#fff" : colors.text,
            fontWeight: "700",
          }}
        >
          {item}
        </Text>
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
<View style={{ marginTop: 20 }}>
  <Text style={{ fontWeight: "700", fontSize: 18 }}>
    🛡️ Kavach Health — Free OPD
  </Text>

  <Text style={{ marginTop: 6 }}>
    Consultation Fee : ₹0
  </Text>

  <Text>
    Platform Fee : ₹0
  </Text>

  <Text
    style={{
      fontWeight: "800",
      fontSize: 20,
      marginTop: 10,
    }}
  >
    Total : ₹0
  </Text>

  <Text
    style={{
      marginTop: 8,
      fontWeight: "600",
    }}
  >
    🎉 No payment required
  </Text>
</View>

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
  title={loading ? "Booking..." : "Confirm"}
  onPress={confirm}
/>
}



</View>



</ScrollView>
</View>
);

}



const styles=StyleSheet.create({

container:{
flex:1,
padding:20
},
doctorCard: {
  marginTop: 16,
  marginBottom: 12,
},

doctorTitle: {
  fontSize: 16,
  fontWeight: "700",
  marginBottom: 8,
},

doctorName: {
  fontSize: 20,
  fontWeight: "800",
},

doctorInfo: {
  marginTop: 4,
  fontSize: 15,
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