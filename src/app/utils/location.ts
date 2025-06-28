export const getCurrentPosition = (): Promise<GeolocationCoordinates> =>{
    return new Promise((resolve, reject) => {
        if(!navigator.geolocation){
            return reject("Geolocation unavalible");
        }

        navigator.geolocation.getCurrentPosition(
            (position) => resolve(position.coords),
            (error) => reject(error.message)
        );
    });
};