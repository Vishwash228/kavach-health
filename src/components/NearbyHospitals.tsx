import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";


export default function NearbyHospitals() {
   const navigation = useNavigation<any>();
    

  const [hospitals, setHospitals] = useState<any[]>([
    {
      id: "1",
      name: "Apollo Hospital",
      rating: "4.8",
      distance: "2.1 km",
      wait: "15 min",
      image: "https://picsum.photos/400/250?1",
    },
    {
      id: "2",
      name: "Fortis Hospital",
      rating: "4.7",
      distance: "3.5 km",
      wait: "20 min",
      image: "https://picsum.photos/400/250?2",
    },
  ]);
 
  
  useEffect(() => {
    const loadHospitals = async () => {
      try {
        const snapshot = await getDocs(
          collection(db, "hospitals")
        );

        if (!snapshot.empty) {

          const hospitalList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setHospitals(hospitalList);
        }

      } catch(error) {
        console.log(error);
      }
    };

    loadHospitals();

  }, []);



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nearby Hospitals</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={hospitals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={styles.content}>
              <Text style={styles.name}>{item.name}</Text>

              <View style={styles.row}>
                <Ionicons name="star" size={14} color="#F59E0B" />
                <Text style={styles.info}>{item.rating}</Text>

                <Ionicons
                  name="location"
                  size={14}
                  color="#2563EB"
                  style={{ marginLeft: 10 }}
                />
                <Text style={styles.info}>{item.distance}</Text>
              </View>

              <View style={styles.row}>
                <Ionicons name="time-outline" size={14} color="#10B981" />
                <Text style={styles.info}>Wait {item.wait}</Text>
              </View>

              
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  navigation.navigate("AppointmentBooking", {
                    hospital: item,
                   })
                }
            >
             <Text style={styles.buttonText}>
              Book Now
            </Text>
        </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    paddingLeft: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 20,
    marginBottom: 15,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
  },

  viewAll: {
    color: "#2563EB",
    fontWeight: "600",
  },

  card: {
    width: 280,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginRight: 15,
    overflow: "hidden",
    elevation: 5,
  },

  image: {
    width: "100%",
    height: 150,
  },

  content: {
    padding: 15,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  info: {
    marginLeft: 5,
    color: "#64748B",
  },

  button: {
    marginTop: 15,
    backgroundColor: "#2563EB",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});