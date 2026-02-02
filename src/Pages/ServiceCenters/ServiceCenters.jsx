import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLoaderData } from 'react-router';

const ServiceCenters = () => {

    // const position = [23.6850, 90.3563];

    const defaultCenter = [23.6850, 90.3563];

    const getInitialZoom = () => {
        if (window.innerWidth >= 640) return 8;
        return 7;
    };

    const defaultZoom = getInitialZoom();

    const serviceCenterData = useLoaderData();


    const [searchText, setSearchText] = useState('');


    const [zoomLevel, setZoomLevel] = useState(getInitialZoom());
    const mapRef = useRef(null);

    // Responsive zoom
    useEffect(() => {

        const handleResize = () => {
            setZoomLevel(window.innerWidth >= 640 ? 8 : 7);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // dynamic fly when type

    useEffect(() => {

        if (!mapRef.current) return;

        // search clear default 
        if (!searchText) {
            mapRef.current.flyTo(defaultCenter, defaultZoom, {
                duration: 1.2
            });
            return;
        }

        const district = serviceCenterData.find(c =>
            c.district.toLowerCase().includes(searchText.toLowerCase())
        );

        if (district && mapRef.current) {
            mapRef.current.flyTo(
                [district.latitude, district.longitude],
                14,
                { duration: 1.5 }
            );
        }
    }, [searchText, serviceCenterData]);


    const filteredDistricts = serviceCenterData.filter(c =>
        c.district.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div>
            <h2 className="text-center font-bold my-4 md:my-7 lg:my-10 text-2xl md:text-4xl">
                We are available in 64 districts
            </h2>

            {/* 🔍 search */}
            {/* 🔍 search */}
            <div className="mb-6 flex justify-center">
                <div className="relative w-full max-w-md">

                    <label className="input input-bordered flex items-center gap-2 w-full">
                        <svg
                            className="h-[1em] opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <circle cx="11" cy="11" r="8" stroke="currentColor" fill="none" />
                            <path d="m21 21-4.3-4.3" stroke="currentColor" />
                        </svg>

                        <input
                            type="search"
                            className="grow"
                            placeholder="Search district"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </label>

                    {/* Suggestions */}
                    {searchText && filteredDistricts.length > 0 && (
                        <ul className="absolute top-full left-0 z-50 w-full bg-white border rounded shadow mt-1 max-h-60 overflow-y-auto">
                            {filteredDistricts.slice(0, 6).map((d, i) => (
                                <li
                                    key={i}
                                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => {
                                        setSearchText(d.district);
                                        mapRef.current.flyTo([d.latitude, d.longitude], 14);
                                    }}
                                >
                                    {d.district}
                                </li>
                            ))}
                        </ul>
                    )}

                </div>
            </div>


            {/*   map */}

            <div className="border w-full h-[900px] md:h-[1200px]">
                <MapContainer
                    center={defaultCenter}
                    zoom={zoomLevel}
                    scrollWheelZoom={false}
                    className="h-[900px] md:h-[1200px]"
                    ref={mapRef}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {serviceCenterData.map((center, index) => (
                        <Marker
                            key={index}
                            position={[center.latitude, center.longitude]}
                        >
                            <Popup>
                                <strong>{center.district}</strong>
                                <br />
                                Service Area: {center.covered_area.join(', ')}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default ServiceCenters;
