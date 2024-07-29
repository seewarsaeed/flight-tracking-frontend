function initMap()
{
    //Map option
    var options={
        center:{lat:38.3460 ,lng:-0.4907 },
        zoom:8
    }
    //new Map
    map = new google.maps.Map(document.getElementById("map"),options);

  /*  //Marker
     const marker=new google.maps.Marker(
        {
            position:{lat:37.9922,lng:-1.1307},
            map:map,
            // icon:"https://img.icons8.com/nolan/2x/marker.png"
        }
    );


    const detailWindow=new google.maps.InfoWindow(
        {
             content: `<h2>city:Murcia City <br><hr>depDate:12/12/2023<br><hr>ArrivalDate:13/12/2023<br><hr>FlightNum:1256</h2>`
            //    content:property.content
        }
    );

    

    marker.addListener("click",()=>{
        detailWindow.open(map,marker);
    })*/
  

    //Add Marker

    function addMarker(property){

        const marker=new google.maps.Marker(
            {
                position:property.location,
                map:map,
                // icon:"https://img.icons8.com/nolan/2x/marker.png"
                 icon:property.imageIcon

            }
        );
        //check for custom Icon
        if(property.imageIcon){
            //set image icon 
            marker.setIcon(property.imageIcon)
        }

        if(property.content){

            const detailWindow=new google.maps.InfoWindow(
                {
                    //  content: `<h2>city:Murcia City <br><hr>depDate:12/12/2023<br><hr>ArrivalDate:13/12/2023<br><hr>FlightNum:1256</h2>`
                       content:property.content
                });
            marker.addListener("click",()=>{
                detailWindow.open(map,marker);
            })
        }
        

    
    } 
    addMarker({location:{lat:37.9922,lng:-1.1307},
    imageIcon:"https://img.icons8.com/nolan/2x/marker.png" ,
    content: `<h2>city:Murcia City <br><hr>depDate:12/12/2023<br><hr>ArrivalDate:13/12/2023<br><hr>FlightNum:1256</h2>`
     } );
    addMarker({location:{lat:39.4699,lng:-0.3763},
        content: `<h2>city:Benidorm City <br><hr>depDate:12/12/2023<br><hr>ArrivalDate:13/12/2023<br><hr>FlightNum:1256</h2>`});
    addMarker({location:{lat:38.5411,lng:-0.1225}, content: `<h2>city:velencia City <br><hr>depDate:12/12/2023<br><hr>ArrivalDate:13/12/2023<br><hr>FlightNum:1256</h2>`});

    // addMarker({lat:36.2384,lng:-30.5852});
    // addMarker({lat:31.9522,lng:-35.2332});



}