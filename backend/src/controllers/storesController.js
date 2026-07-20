const storesModel = require("../models/storesModel");
const {
  getStoreStatus
} = require("../utils/hoursUtils");


const searchStores = async (req, res) => {
  try {

    let {
      city_id,
      locality_id,
      neighborhood_id,
      category_id
    } = req.query;


    /*
      Convertir parámetros
      de URL a números
    */

    city_id = city_id
      ? Number(city_id)
      : undefined;


    locality_id = locality_id
      ? Number(locality_id)
      : undefined;


    category_id = category_id
      ? Number(category_id)
      : undefined;



    /*
      Manejo especial:
      neighborhood_id puede ser null
    */

    if (neighborhood_id === "null") {

      neighborhood_id = null;

    } else if (neighborhood_id) {

      neighborhood_id = Number(neighborhood_id);

    } else {

      neighborhood_id = undefined;

    }



    /*
      Buscar establecimientos
    */

    const stores = await storesModel.searchStores({

      city_id,
      locality_id,
      neighborhood_id,
      category_id

    });



    /*
      Preparar respuesta final
      para frontend
    */

    const storesFormatted = stores.map(store => ({


      ...store,


      /*
        Estado abierto/cerrado
        calculado por horarios
      */
      status: getStoreStatus(
        store.hours
      ),



      /*
        WhatsApp listo para abrir chat
        desde React Native
      */

      whatsapp_link: store.whatsapp
        ? `https://wa.me/57${store.whatsapp.replace(/\D/g, "")}`
        : null,



      /*
        Precio convertido a texto
        para mostrar en cards
      */

      price_label:
        store.price_level === 1
          ? "$"
          :
        store.price_level === 2
          ? "$$"
          :
        store.price_level === 3
          ? "$$$"
          :
        store.price_level === 4
          ? "$$$$"
          :
          null



    }));



    res.json(storesFormatted);



  } catch (error) {

    console.error(
      "Error searchStores:",
      error
    );


    res.status(500).json({

      message:
        "Error al buscar establecimientos"

    });

  }
};

const getStoreById = async (req,res)=>{

  try {

    const {
      store_id
    } = req.params;


    const store =
      await storesModel.getStoreById(
        Number(store_id)
      );


    if(!store){

      return res.status(404).json({
        message:"Establecimiento no encontrado"
      });

    }


    res.json(store);


  } catch(error){

    console.error(error);

    res.status(500).json({
      message:"Error obteniendo establecimiento"
    });

  }

};


module.exports = {
  searchStores,
  getStoreById,
};