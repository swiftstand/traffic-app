var LOCAL = "http://192.168.223.56:8000"

var TEST = "http://trafficbackend.pythonanywhere.com"

export function LoginRequest(username, password){
    return fetch(`${LOCAL}/api/user/login/`, {
        method:"POST",
        headers:{
            'Access-Control-Allow-Origin': '*',
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            username:username,
            password:password,
        }),
    })
    .then(resp => resp.json())
    .then(res => {
        console.log(res);
        return res;
    });
}

export function RegisterRequest(data){
    return fetch(`${LOCAL}/api/user/register/`, {
        method:"POST",
        headers:{
            'Access-Control-Allow-Origin': '*',
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            username:data.username,
            fullname:data.fullname,
            email:data.email,
            password:data.password,
        }),
    })
    .then(resp => resp.json())
    .then(res => {
        console.log(res);
        return res;
    });
}



export function LogoutRequest(token){
    return fetch(`${LOCAL}/api/user/logout/`, {
        method:"GET",
        headers:{
            'Access-Control-Allow-Origin': '*',
            'Content-Type':'application/json',
            'Authorization': 'Token '+token
        },
    })
    .then(resp => resp.json())
    .then(res => {
        console.log(res);
        return res;
    });
}



export function ResetRequest(username,email,){
    return fetch(`${LOCAL}/api/user/password/reset/`, {
        method:"POST",
        headers:{
            'Access-Control-Allow-Origin': '*',
            'Content-Type':'application/json',
        },

        body:JSON.stringify({
            username:username,
            email:email,
        }),
    })
    .then(resp => resp.json())
    .then(res => {
        console.log(res);
        return res;
    });
}


export function ResetConfirmRequest(data,token){
    return fetch(`${LOCAL}/api/user/password/confirm/`, {
        method:"POST",
        headers:{
            'Access-Control-Allow-Origin': '*',
            'Content-Type':'application/json',
            'Authorization': 'Token '+token
        },
        body:JSON.stringify({
            code:data.code,
            password:data.password,
        }),
    })
    .then(resp => resp.json())
    .then(res => {
        console.log(res);
        return res;
    });
}



export function CheckRequests(localty){
    return fetch(`${LOCAL}/api/traffic/updates/${localty}`, {
        method:'GET',
        headers:{
            'Access-Control-Allow-Origin': '*',
            'Content-Type':'application/json',
            // 'Authorization': 'Token ' + token,
        },
    })
    .then(resp => resp.json())
    .then(res => {
        return res;
    });
}


export function googleRequest(long,lat){
    //https://maps.googleapis.com/maps/api/geocode/json?key=+AlzaSyDzXDIQ6JgrKD6CHHjrhv2YtNUWYCIVL00+&latlng=+7.7516117+4.5480985;
    return fetch(`https://maps.googleapi.com/maps/api/geocode/json?latlng=${lat},${long}&key=AlzaSyDzXDIQ6JgrKD6CHHjrhv2YtNUWYCIVL00`, {
        method:'GET',
        params:{
            latlong:{lat:lat,lng:long},
            language:'en',
            key:'AlzaSyDzXDIQ6JgrKD6CHHjrhv2YtNUWYCIVL00',
        },

    })
    .then(resp => resp.json())
    .then(res => {
        return res;
    });
}


export function DropgRequest(data, token){
    return fetch(`${LOCAL}/api/traffic/updates/create/`, {
        method:'POST',
        headers:{
            'Access-Control-Allow-Origin': '*',
            'Content-Type':'application/json',
            'Authorization': 'Token ' + token,
        },
        body:JSON.stringify({
            long:data.long,
            lang:data.lat,
            adress:data.data,
            localty:data.localty,
            recommendations:data.recommendation,
        }),
    })
    .then(resp => resp.json())
    .then(res => {
        return res;
    });
}
