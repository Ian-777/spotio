import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import {
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";

import { Linking } from "react-native";


export default function StoreContact({
  store,
}) {

  const contact = store.contact;


  if (!contact) {
    return null;
  }


  const openLink = async (url) => {

    if (!url) return;

    const supported =
      await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    }

  };


  return (

    <View style={styles.container}>


      <Text style={styles.sectionTitle}>
        Contacto
      </Text>



      {
        contact.phone && (

          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              openLink(
                `tel:${contact.phone}`
              )
            }
          >

            <MaterialIcons
              name="phone"
              size={24}
              color="#8B5CF6"
            />


            <View>
              <Text style={styles.title}>
                Teléfono
              </Text>

              <Text style={styles.value}>
                {contact.phone}
              </Text>
            </View>


          </TouchableOpacity>

        )
      }




      {
        contact.whatsapp_url && (

          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              openLink(
                contact.whatsapp_url
              )
            }
          >

            <FontAwesome
              name="whatsapp"
              size={25}
              color="#25D366"
            />


            <View>

              <Text style={styles.title}>
                WhatsApp
              </Text>


              <Text style={styles.value}>
                {contact.whatsapp}
              </Text>


            </View>


          </TouchableOpacity>

        )
      }




      {
        contact.website && (

          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              openLink(
                contact.website
              )
            }
          >

            <MaterialIcons
              name="language"
              size={24}
              color="#8B5CF6"
            />


            <View>

              <Text style={styles.title}>
                Sitio web
              </Text>


              <Text style={styles.value}>
                {contact.website}
              </Text>


            </View>


          </TouchableOpacity>

        )
      }



    </View>

  );
}



const styles =
StyleSheet.create({

  container:{
    marginBottom:25,
  },


  sectionTitle:{
    color:"#FFFFFF",
    fontSize:24,
    fontWeight:"700",
    marginBottom:18,
  },


  card:{
    backgroundColor:"#1A1A1A",
    borderRadius:16,
    padding:18,
    marginBottom:14,

    flexDirection:"row",
    alignItems:"center",
  },


  title:{
    color:"#FFFFFF",
    fontSize:16,
    fontWeight:"700",
    marginLeft:15,
  },


  value:{
    color:"#CFCFCF",
    fontSize:15,
    marginLeft:15,
    marginTop:4,
    maxWidth:280,
  },


});