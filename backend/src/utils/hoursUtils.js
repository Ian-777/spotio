const getStoreStatus = (hours = []) => {

    const now = new Date();


    let day = now.getDay();

    // JS:
    // domingo = 0
    // PostgreSQL:
    // lunes = 1
    // domingo = 7

    day = day === 0 ? 7 : day;



    const currentMinutes =
        now.getHours() * 60 +
        now.getMinutes();



    const today = hours.find(
        h => h.day_of_week === day
    );



    if (!today || today.is_closed) {

        return {

            is_open: false,

            availability: "CLOSED_TODAY",

            label: "Cerrado hoy"

        };

    }

    
    const openMinutes =
        timeToMinutes(today.open_time);


    const closeMinutes =
        timeToMinutes(today.close_time);



    let isOpen;



    /*
      Horario normal
  
      Ej:
      09:00 - 18:00
  
    */

    if (closeMinutes > openMinutes) {


        isOpen =
            currentMinutes >= openMinutes &&
            currentMinutes <= closeMinutes;


    }



    /*
      Cruza medianoche
  
      Ej:
      17:00 - 01:00
  
    */

    else {


        isOpen =
            currentMinutes >= openMinutes ||
            currentMinutes <= closeMinutes;


    }



    if (isOpen) {

        return {

            is_open: true,

            availability: "OPEN",

            label: "Abierto ahora",

            closes_at:
                today.close_time,

            closes_in:
                getTimeDifference(
                    currentMinutes,
                    closeMinutes
                )

        };

    }



    const opensIn =
        getTimeDifference(
            currentMinutes,
            openMinutes
        );


    return {

        is_open: false,

        availability:
            opensIn.includes("minutos") ||
                opensIn.includes("hora")
                ? "OPENING_SOON"
                : "CLOSED",

        label:
            opensIn.includes("minutos") ||
                opensIn.includes("hora")
                ? "Abre pronto"
                : "Cerrado ahora",


        opens_at:
            today.open_time,


        opens_in:
            opensIn

    };


};





const timeToMinutes = (time) => {


    const [
        hours,
        minutes
    ] = time
        .substring(0, 5)
        .split(":")
        .map(Number);


    return (
        hours * 60 +
        minutes
    );


};





const getTimeDifference = (
    current,
    target
) => {


    let difference =
        target - current;



    /*
      Cuando cruza medianoche
  
      Ej:
      Ahora 23:00
      abre 17:00 mañana
  
    */

    if (difference < 0) {

        difference += 24 * 60;

    }



    const hours =
        Math.floor(
            difference / 60
        );


    const minutes =
        difference % 60;



    if (hours === 0) {

        return `${minutes} minutos`;

    }



    if (minutes === 0) {

        return `${hours} horas`;

    }



    return `${hours} horas ${minutes} minutos`;

};




module.exports = {
    getStoreStatus
};