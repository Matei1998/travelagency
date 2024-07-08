import { createBrowserRouter } from "react-router-dom";
import Home  from "../../Pages/Home";
import { Contact } from "../../Pages/Contact";
import { Destinatii } from "../../Pages/Destinatii";
import { Autentificare } from "../../Pages/Autentificare";
import { Inregistrare } from "../../Pages/Inregistrare";
import { Grecia } from "../../Pages/Grecia";
import { Tailanda } from "../../Pages/Tailanda";
import { Turcia } from "../../Pages/Turcia";
import { RepublicaDominicana } from "../../Pages/RepublicaDominicana";
import { Maldive } from "../../Pages/Maldive";
import { Indonezia } from "../../Pages/Indonezia";
import { Rezervari } from "../../Pages/Rezervari";




export enum Pages {
    Home = "/Home",
    
    Contact ="/Contact",
    Destinatii = "/Destinatii",
    Autentificare = "/Autentificare",
    Inregistrare = "/Inregistrare",
    Grecia = "/Destinatii/Grecia",
    Turcia = "/Destinatii/Turcia",
    Tailanda = "/Destinatii/Tailanda",
    RepublicaDominicana = "/Destinatii/Republica Dominicana",
    Maldive ="Destinatii/Maldive",
    Indonezia = "Destinatii/Indonezia",
    Rezervari = "Destinatii/Rezervari"
}

const routes = [
    {
        path: Pages.Home,
        element: <Home />
    },
   
    {
        path: Pages.Contact,
        element: <Contact />
    },
    {
        path: Pages.Autentificare,
        element: <Autentificare />
    },
    {
        path: Pages.Inregistrare,
        element: <Inregistrare />
    },
    {
        path: Pages.Destinatii,
        element: <Destinatii />
    },
    {
        path: Pages.Grecia,
        element: <Grecia />
    },
    {
        path: Pages.Tailanda,
        element: <Tailanda />
    },
    {
        path: Pages.Turcia,
        element: <Turcia />
    },
    {
        path: Pages.RepublicaDominicana,
        element: <RepublicaDominicana />
    },
    {
        path: Pages.Maldive,
        element: <Maldive />
    },
    {
        path: Pages.Indonezia,
        element: <Indonezia />
    },
    {
        path: Pages.Rezervari,
        element: <Rezervari />
    },

    {
        path: "/",
        element: <div></div>
    }
]

export const router = createBrowserRouter(routes);