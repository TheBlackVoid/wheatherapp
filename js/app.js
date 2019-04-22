window.addEventListener('load', () =>{
    let long;
    let lat;
    const tempDescription = document.querySelector('.temp-description');
    const tempDegree = document.querySelector('.temp-degree');
    const locationTimezone = document.querySelector('.location-timezone');
    let tempratureSection = document.querySelector('.degree-section');
    const tempratureSpan = document.querySelector('.degree-section span')

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
           long = position.coords.longitude;
           lat = position.coords.latitude;

           const proxy = 'https://cors-anywhere.herokuapp.com/'
           const api = `${proxy}https://api.darksky.net/forecast/b17517aea97a2bf3c71a3d95c27223d7/${lat}, ${long}`;

           fetch(api)
           .then(data => {
               return data.json();
           })
           .then(data =>{
               const {temperature, summary, icon} = data.currently;

               tempDegree.textContent =  temperature;
               tempDescription.textContent = summary;
               locationTimezone.textContent = data.timezone;

               let celsius = (temperature - 32) * (5 / 9);

               setIcons(icon, document.querySelector('.icon'));
               
               tempratureSection.addEventListener("click", () => {
                   if(tempratureSpan.textContent === "F") {
                       tempratureSpan.textContent = "C";
                       tempDegree.textContent = Math.floor(celsius);
                   } else {
                    tempratureSpan.textContent = "F";
                    tempDegree.textContent = temperature;
                   }
               })

           });
        });


    } else if (!navigator.geolocation){
        tempDescription.textContent = "We need to know your location to give you accurate data :("
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon =  icon.replace(/-/g, "_").toUpperCase();
        skycons.play()
        return skycons.set(iconID, Skycons[currentIcon])
    }
});