import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import openSocket from "socket.io-client";

const DeliveryMap = () => {
  const [deliveryLocation, setDeliveryLocation] = useState([51.505, -0.09]);
  let delaveryMan = {
      name: "Delivery Man",
      coordinates: [51.505, -0.09],
    },
    clientHouse = {
      name: "Your Location",
      coordinates: [51.5, -0.04],
    };

  // useEffect(() => {
  //   let url = `${process.env.REACT_APP_SERVER_DOMAIN}move-points`;
  //   fetch(url, {
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //   }).catch((err) => {
  //     console.log("Error::", err);
  //   });
  // }, []);

  useEffect(() => {
    const socket = openSocket("http://localhost:4000");
    socket.on("deliveryMoves", (data) => {
      console.log(data.content.postion);
      setDeliveryLocation(data.content.postion);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div
      className="flex items-start justify-around w-full p-5"
      style={{ height: "76vh" }}
    >
      <div>
        <p className="font-bold text-xl">
          <span className="text-green-500">Our Location : </span>
          <span className="text-gray-500">
            {" "}
            {clientHouse.coordinates.toString()}
          </span>
        </p>
        <p className="font-bold text-xl">
          <span className="text-green-500">Delivery Location : </span>
          <span className="text-gray-500"> {deliveryLocation.toString()}</span>
        </p>
        <h2 class="mb-2 text-lg font-semibold text-orange-600 dark:text-white">
          Note :
        </h2>
        <ul class="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
          <li>This is a dummy data I made it just for test </li>
          <li>As I build this project to improve my skills :)</li>
          <li>Real Time User Tracking For Delivery Using Socket.io</li>
        </ul>
      </div>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: "400px", width: "600px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="Map data © <a href='https://www.openstreetmap.org'>OpenStreetMap</a> contributors"
        />
        {/* Delivery Man */}
        <Marker position={deliveryLocation}>
          <Popup>
            <div>
              <strong>Delivery ID:</strong> #delaveryMan101
            </div>
            <div>
              <strong>Location:</strong> {delaveryMan.name}
            </div>
          </Popup>
        </Marker>
        {/* client location */}
        <Marker position={clientHouse.coordinates}>
          <Popup>
            <div>
              <strong>Delivery ID:</strong> #client101
            </div>
            <div>
              <strong>Location:</strong> {clientHouse.name}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default DeliveryMap;
