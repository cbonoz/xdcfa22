

export const getLocation = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(function(position) {
            const p = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }
            console.log('position', position)
            resolve(p)
          }, (e) => reject(e));
    })
}