import { useParams } from 'react-router-dom';
import CardStaticWrapper from '../components/layout/CardStaticWrapper';
import ItalicQuotes from '../components/layout/ItalicQuotes'
const featuredArticles = [{
  title: "Intenzionalità e distruzione: riflessioni sull'accusa di genocidio a Gaza",
  slug: "genocide-accusation-gaza",
  image: "https://www.amnesty.org/en/wp-content/uploads/2024/12/GettyImages-2182380031-scaled-e1733253256526-1468x710.jpg",
  main: "Il termine genocidio fu coniato dal giurista Raphael Lemkin nel 1944 e venne poi formalmente definito nella Convenzione delle Nazioni Unite del 1948. In base all'articolo 2 di questa convenzione, il genocidio è qualsiasi atto commesso con l'intento di distruggere, in tutto o in parte, un gruppo nazionale, etnico, razziale o religioso.\n\nGli atti che possono configurare un genocidio includono: l'uccisione di membri del gruppo; il causare gravi danni fisici o mentali; il sottoporre deliberatamente il gruppo a condizioni di vita intese a provocarne la distruzione fisica totale o parziale; l'imposizione di misure per impedire nascite; il trasferimento forzato di bambini a un altro gruppo.\n\nElemento essenziale per qualificare un atto come genocidio è l'intenzione specifica di distruggere il gruppo in quanto tale. Non basta quindi che ci siano morti di massa o sofferenze estreme: serve una prova dell'intento distruttivo deliberato.\n\nNel gennaio 2024, il Sudafrica ha presentato una denuncia alla Corte Internazionale di Giustizia (ICJ), accusando Israele di aver commesso atti di genocidio contro la popolazione palestinese nella Striscia di Gaza. La Corte ha riconosciuto che le accuse sono plausibili e ha disposto misure cautelari, ma non ha ancora stabilito se il genocidio sia effettivamente in corso.\n\nSecondo i denuncianti, Israele avrebbe compiuto una serie di atti che rientrano nelle categorie previste dalla Convenzione. Le operazioni militari avrebbero causato la morte di decine di migliaia di civili palestinesi, distrutto infrastrutture vitali come ospedali e scuole, e provocato una crisi umanitaria con carestia, mancanza d’acqua e impossibilità di accedere alle cure mediche. Tuttavia, come stabilito dal diritto internazionale, il punto decisivo resta dimostrare che questi atti sono stati compiuti con l’intento specifico di distruggere i palestinesi in quanto gruppo.\n\nA questo proposito, alcune dichiarazioni pubbliche di membri del governo israeliano sono state citate come elementi che potrebbero suggerire tale intento. Il ministro della Difesa Yoav Gallant, nell’ottobre 2023, ha affermato: \"Abbiamo a che fare con animali umani e agiamo di conseguenza\", una frase interpretata come disumanizzante. Il primo ministro Benjamin Netanyahu, nello stesso periodo, ha dichiarato: \"Ricordate cosa ha fatto Amalek. Ora lo facciamo noi\", facendo riferimento a un passo biblico in cui viene ordinato lo sterminio totale di un popolo, compresi donne e bambini. Itamar Ben Gvir, ministro della Sicurezza nazionale, ha più volte affermato che \"il diritto degli ebrei alla libertà viene prima del diritto dei palestinesi a viaggiare\", mentre il ministro delle Finanze Bezalel Smotrich ha dichiarato che la guerra è per \"eliminare la minaccia araba, non solo Hamas\". Queste affermazioni sono state citate nella causa come indizi della volontà di colpire l’intero popolo palestinese, e non soltanto un’organizzazione armata.\n\nLa questione se Israele stia commettendo un genocidio a Gaza resta aperta. Le prove raccolte verranno valutate dalla Corte Internazionale di Giustizia, che dovrà stabilire se l’intento genocida sia presente e documentabile. Fino ad allora, l’accusa rimane grave, ma non ancora giudicata. L'esito del processo potrebbe avere un impatto profondo sulla giurisprudenza internazionale e sulla legittimità futura di molte azioni statali in contesti di guerra.\n\nLa realtà del conflitto israelo-palestinese non è nata oggi. È il risultato di decenni – anzi, oltre settantacinque anni – di tensioni, occupazione, espropriazioni, attacchi, risposte armate, ma anche fallimenti diplomatici, complicità internazionali e impunità sistemica. Ridurre tutto a una narrativa di autodifesa o terrorismo, ignorando il contesto storico e le responsabilità strutturali, è intellettualmente disonesto.\n\nÈ giunto il momento di smettere di girare intorno alle parole. Davanti a migliaia di vite spezzate, alla sistematica distruzione di un’intera popolazione, alle dichiarazioni che parlano di “animali umani” e richiami a stermini biblici, non si può più parlare solo di guerra. Quando c’è l’intento dichiarato, la sistematicità, la disumanizzazione e l'annientamento di un popolo, allora bisogna chiamarlo con il suo nome: genocidio."
}];

export default function ArticleDetail() {
  const { slug } = useParams();

  const article = featuredArticles.find(a => a.slug === slug);

  if (!article) {
    return <div className="p-8 max-w-4xl mx-auto text-center">Articolo non trovato</div>;
  }

  return (
    <div className="w-full font-arvo  ">
      {/* Immagine come sfondo con overlay e titolo */}
      <div
        className="w-full h-[500px] relative flex items-end p-8 text-white rounded"
        style={{ backgroundImage: `url(${article.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="bg-black/50 p-6 rounded text-3xl font-bold max-w-3xl">
          {article.title}
        </div>
      </div>
      <div className='px-36'>
        <CardStaticWrapper>
          {/* Testo articolo */}
          <p
            style={{ whiteSpace: 'pre-line', lineHeight: '1.6', fontSize: '1.125rem' }}
            className="mt-6 text-black"
          >
            <ItalicQuotes text={article.main} />
          </p>
        </CardStaticWrapper>
      </div>
      <div style={{ height: '160px' }}></div>

    </div>
  );
}

