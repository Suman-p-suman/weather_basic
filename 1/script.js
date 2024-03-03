// http://api.weatherapi.com/v1/current.json?key=6f170afe81b54c27bef112418240303 &q=London&aqi=yes
const input=document.getElementById("input-button")
const search=document.getElementById("city-button")
const cityName=document.getElementById("city-name")
const cityTime=document.getElementById("city-time")
const cityDeg=document.getElementById("city-temp")
const getLoc=document.getElementById("get-loc")
getLoc.addEventListener('click', async () => {
    var location=await navigator.geolocation.getCurrentPosition(getLocation,notLocation);
})
async function getLocation(postion){
    let lat=postion.coords.latitude;
    let long=postion.coords.longitude;
    const lat_long=await getLatandLand(lat,long);
    cityName.innerText=`${lat_long.location.name} ${lat_long.location.region}-${lat_long.location.country}`;
    cityTime.innerText=lat_long.location.localtime;
    cityDeg.innerText=lat_long.current.temp_c;
}
 async function getLatandLand(lat,long){
    const city=await fetch(`http://api.weatherapi.com/v1/current.json?key=6f170afe81b54c27bef112418240303 &q=${lat},${long}&aqi=yes`)
    return await city.json();
}
function notLocation(){
    console.log("there was some errror")
}
async function getData(cityName){
    const city=await fetch(`http://api.weatherapi.com/v1/current.json?key=6f170afe81b54c27bef112418240303 &q=${cityName}&aqi=yes`)
    return await city.json();
}
search.addEventListener('click',async ()=>{
    let val=input.value;
    const va=await getData(val);
    
    cityName.innerText=`${va.location.name} ${va.location.region}-${va.location.country}`;
    cityTime.innerText=va.location.localtime;
    cityDeg.innerText=va.current.temp_c;

})