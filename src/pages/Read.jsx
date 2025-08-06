import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const featuredArticles = [
    {
        title: 'A Hiroshima è sempre il 6 agosto del 1945',
        image: "https://www.ilpost.it/wp-content/uploads/2025/07/31/1753966218-h_7.16251584.jpg",
    },
    {
        title: 'I cattivi dei film assomigliano sempre di più ai miliardari della tecnologia',
        image: "https://static-prod.cdnilpost.com/wp-content/uploads/2025/08/01/1754029930-Screenshot-2025-08-01-alle-08.28.23.png",
    },
    {
        title: "Intenzionalità e distruzione: riflessioni sull'accusa di genocidio a Gaza",
        slug: "genocide-accusation-gaza",
        image: "https://www.amnesty.org/en/wp-content/uploads/2024/12/GettyImages-2182380031-scaled-e1733253256526-1468x710.jpg",
        main: "Il termine genocidio fu coniato dal giurista Raphael Lemkin nel 1944 e venne poi formalmente definito nella Convenzione delle Nazioni Unite del 1948. In base all'articolo 2 di questa convenzione, il genocidio è qualsiasi atto commesso con l'intento di distruggere, in tutto o in parte, un gruppo nazionale, etnico, razziale o religioso.\n\nGli atti che possono configurare un genocidio includono: l'uccisione di membri del gruppo; il causare gravi danni fisici o mentali; il sottoporre deliberatamente il gruppo a condizioni di vita intese a provocarne la distruzione fisica totale o parziale; l'imposizione di misure per impedire nascite; il trasferimento forzato di bambini a un altro gruppo.\n\nElemento essenziale per qualificare un atto come genocidio è l'intenzione specifica di distruggere il gruppo in quanto tale. Non basta quindi che ci siano morti di massa o sofferenze estreme: serve una prova dell'intento distruttivo deliberato.\n\nNel gennaio 2024, il Sudafrica ha presentato una denuncia alla Corte Internazionale di Giustizia (ICJ), accusando Israele di aver commesso atti di genocidio contro la popolazione palestinese nella Striscia di Gaza. La Corte ha riconosciuto che le accuse sono plausibili e ha disposto misure cautelari, ma non ha ancora stabilito se il genocidio sia effettivamente in corso.\n\nSecondo i denuncianti, Israele avrebbe compiuto una serie di atti che rientrano nelle categorie previste dalla Convenzione. Le operazioni militari avrebbero causato la morte di decine di migliaia di civili palestinesi, distrutto infrastrutture vitali come ospedali e scuole, e provocato una crisi umanitaria con carestia, mancanza d’acqua e impossibilità di accedere alle cure mediche. Tuttavia, come stabilito dal diritto internazionale, il punto decisivo resta dimostrare che questi atti sono stati compiuti con l’intento specifico di distruggere i palestinesi in quanto gruppo.\n\nA questo proposito, alcune dichiarazioni pubbliche di membri del governo israeliano sono state citate come elementi che potrebbero suggerire tale intento. Il ministro della Difesa Yoav Gallant, nell’ottobre 2023, ha affermato: \"Abbiamo a che fare con animali umani e agiamo di conseguenza\", una frase interpretata come disumanizzante. Il primo ministro Benjamin Netanyahu, nello stesso periodo, ha dichiarato: \"Ricordate cosa ha fatto Amalek. Ora lo facciamo noi\", facendo riferimento a un passo biblico in cui viene ordinato lo sterminio totale di un popolo, compresi donne e bambini. Itamar Ben Gvir, ministro della Sicurezza nazionale, ha più volte affermato che \"il diritto degli ebrei alla libertà viene prima del diritto dei palestinesi a viaggiare\", mentre il ministro delle Finanze Bezalel Smotrich ha dichiarato che la guerra è per \"eliminare la minaccia araba, non solo Hamas\". Queste affermazioni sono state citate nella causa come indizi della volontà di colpire l’intero popolo palestinese, e non soltanto un’organizzazione armata.\n\nA complicare ulteriormente il dibattito vi è la diffusione, durante il conflitto, di video manipolati o interamente generati tramite intelligenza artificiale. Alcuni mostrano presunti leader israeliani mentre pronunciano discorsi estremi o ordini di sterminio, ma sono falsificazioni costruite con tecnologie di voice cloning e deepfake. Questi materiali hanno aumentato la confusione e sono stati utilizzati anche per manipolare l’opinione pubblica internazionale. È quindi importante distinguere tra dichiarazioni autentiche, dichiarazioni decontestualizzate e contenuti artificiali.\n\nLa questione se Israele stia commettendo un genocidio a Gaza resta aperta. Le prove raccolte verranno valutate dalla Corte Internazionale di Giustizia, che dovrà stabilire se l’intento genocida sia presente e documentabile. Fino ad allora, l’accusa rimane grave, ma non ancora giudicata. L'esito del processo potrebbe avere un impatto profondo sulla giurisprudenza internazionale e sulla legittimità futura di molte azioni statali in contesti di guerra."

    },
];

const recentArticles = [
    {
        title: 'A Hiroshima è sempre il 6 agosto del 1945',
        image: "https://www.ilpost.it/wp-content/uploads/2025/07/31/1753966218-h_7.16251584.jpg",
        excerpt: 'La città giapponese distrutta dal primo attacco nucleare della storia è stata ricostruita in modo da ricordarlo a tutto il mondo',
    },
    {
        title: 'I cattivi dei film assomigliano sempre di più ai miliardari della tecnologia',
        image: "https://static-prod.cdnilpost.com/wp-content/uploads/2025/08/01/1754029930-Screenshot-2025-08-01-alle-08.28.23.png",
        excerpt: 'Visionari, arroganti e spregiudicati, ma vestiti casual e apparentemente alla mano',
    },
    {
        title: "Intenzionalità e distruzione: riflessioni sull'accusa di genocidio a Gaza",
        slug: "genocide-accusation-gaza",
        image: "https://www.amnesty.org/en/wp-content/uploads/2024/12/GettyImages-2182380031-scaled-e1733253256526-1468x710.jpg",
        excerpt: "Il genocidio, definito dalla Convenzione ONU del 1948, è un atto compiuto con l'intento di distruggere un gruppo nazionale, etnico, razziale o religioso. Le accuse contro Israele riguardano possibili atti genocidi nella Striscia di Gaza, ma resta da provare l’intento specifico di distruzione.",
        main: "Il termine genocidio fu coniato dal giurista Raphael Lemkin nel 1944 e venne poi formalmente definito nella Convenzione delle Nazioni Unite del 1948. In base all'articolo 2 di questa convenzione, il genocidio è qualsiasi atto commesso con l'intento di distruggere, in tutto o in parte, un gruppo nazionale, etnico, razziale o religioso.\n\nGli atti che possono configurare un genocidio includono: l'uccisione di membri del gruppo; il causare gravi danni fisici o mentali; il sottoporre deliberatamente il gruppo a condizioni di vita intese a provocarne la distruzione fisica totale o parziale; l'imposizione di misure per impedire nascite; il trasferimento forzato di bambini a un altro gruppo.\n\nElemento essenziale per qualificare un atto come genocidio è l'intenzione specifica di distruggere il gruppo in quanto tale. Non basta quindi che ci siano morti di massa o sofferenze estreme: serve una prova dell'intento distruttivo deliberato.\n\nNel gennaio 2024, il Sudafrica ha presentato una denuncia alla Corte Internazionale di Giustizia (ICJ), accusando Israele di aver commesso atti di genocidio contro la popolazione palestinese nella Striscia di Gaza. La Corte ha riconosciuto che le accuse sono plausibili e ha disposto misure cautelari, ma non ha ancora stabilito se il genocidio sia effettivamente in corso.\n\nSecondo i denuncianti, Israele avrebbe compiuto una serie di atti che rientrano nelle categorie previste dalla Convenzione. Le operazioni militari avrebbero causato la morte di decine di migliaia di civili palestinesi, distrutto infrastrutture vitali come ospedali e scuole, e provocato una crisi umanitaria con carestia, mancanza d’acqua e impossibilità di accedere alle cure mediche. Tuttavia, come stabilito dal diritto internazionale, il punto decisivo resta dimostrare che questi atti sono stati compiuti con l’intento specifico di distruggere i palestinesi in quanto gruppo.\n\nA questo proposito, alcune dichiarazioni pubbliche di membri del governo israeliano sono state citate come elementi che potrebbero suggerire tale intento. Il ministro della Difesa Yoav Gallant, nell’ottobre 2023, ha affermato: \"Abbiamo a che fare con animali umani e agiamo di conseguenza\", una frase interpretata come disumanizzante. Il primo ministro Benjamin Netanyahu, nello stesso periodo, ha dichiarato: \"Ricordate cosa ha fatto Amalek. Ora lo facciamo noi\", facendo riferimento a un passo biblico in cui viene ordinato lo sterminio totale di un popolo, compresi donne e bambini. Itamar Ben Gvir, ministro della Sicurezza nazionale, ha più volte affermato che \"il diritto degli ebrei alla libertà viene prima del diritto dei palestinesi a viaggiare\", mentre il ministro delle Finanze Bezalel Smotrich ha dichiarato che la guerra è per \"eliminare la minaccia araba, non solo Hamas\". Queste affermazioni sono state citate nella causa come indizi della volontà di colpire l’intero popolo palestinese, e non soltanto un’organizzazione armata.\n\nA complicare ulteriormente il dibattito vi è la diffusione, durante il conflitto, di video manipolati o interamente generati tramite intelligenza artificiale. Alcuni mostrano presunti leader israeliani mentre pronunciano discorsi estremi o ordini di sterminio, ma sono falsificazioni costruite con tecnologie di voice cloning e deepfake. Questi materiali hanno aumentato la confusione e sono stati utilizzati anche per manipolare l’opinione pubblica internazionale. È quindi importante distinguere tra dichiarazioni autentiche, dichiarazioni decontestualizzate e contenuti artificiali.\n\nLa questione se Israele stia commettendo un genocidio a Gaza resta aperta. Le prove raccolte verranno valutate dalla Corte Internazionale di Giustizia, che dovrà stabilire se l’intento genocida sia presente e documentabile. Fino ad allora, l’accusa rimane grave, ma non ancora giudicata. L'esito del processo potrebbe avere un impatto profondo sulla giurisprudenza internazionale e sulla legittimità futura di molte azioni statali in contesti di guerra."

    },

];

export default function Read() {
    const [current, setCurrent] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % featuredArticles.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full font-arvo">
            {/* Slider principale */}
            <div className="w-full overflow-hidden relative h-[500px]">
                {featuredArticles.map((article, index) => (
                    <div
                        key={index}
                        className={`
              absolute inset-0 bg-cover bg-center flex items-end p-8 text-white
              transition-opacity duration-1000 ease-in-out
              ${index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}
              cursor-pointer
            `}
                        style={{ backgroundImage: `url(${article.image})` }}
                        onClick={() => article.slug && navigate(`/read/${article.slug}`)}
                    >
                        <div className="bg-black/50 p-6 rounded text-3xl font-bold max-w-3xl">
                            {article.title}
                        </div>
                    </div>
                ))}
            </div>

            {/* Sezione articoli recenti */}
            <div className="p-8 max-w-7xl mx-auto">
                <h2 className="text-3xl font-semibold mb-6">Articoli Recenti</h2>
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-48">
                    {recentArticles.map((article, index) => (
                        <div
                            key={index}
                            className="border rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col cursor-pointer"
                            onClick={() => article.slug && navigate(`/read/${article.slug}`)}
                        >
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4 flex flex-col flex-grow bg-white">
                                <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                                <p className="text-gray-600 flex-grow">{article.excerpt}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}