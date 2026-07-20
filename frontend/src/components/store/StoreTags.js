import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";


export default function StoreTags({
  store,
}) {


  if (
    !store.tags ||
    store.tags.length === 0
  ) {
    return null;
  }


  return (

    <View style={styles.container}>


      <Text style={styles.title}>
        Características
      </Text>



      <View style={styles.tagsContainer}>

        {
          store.tags.map(
            (tag,index)=>(

              <View
                key={index}
                style={styles.tag}
              >

                <Text style={styles.tagText}>
                  {tag}
                </Text>

              </View>

            )
          )
        }

      </View>


    </View>

  );

}



const styles = StyleSheet.create({

  container:{
    marginBottom:25,
  },


  title:{
    color:"#FFFFFF",
    fontSize:24,
    fontWeight:"700",
    marginBottom:18,
  },


  tagsContainer:{
    flexDirection:"row",
    flexWrap:"wrap",
    gap:10,
  },


  tag:{
    backgroundColor:"#1A1A1A",
    borderRadius:20,
    paddingHorizontal:15,
    paddingVertical:8,
    borderWidth:1,
    borderColor:"#7C3AED",
  },


  tagText:{
    color:"#FFFFFF",
    fontSize:14,
  },


});