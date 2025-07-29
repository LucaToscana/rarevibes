import CardStaticWrapper from "../layout/CardStaticWrapper";
import FiltersWrapper from "../layout/FiltersWrapper";

const Step1BaseInfo = ({ artistType, setArtistType, formBase, handleBaseInputChange}) => (

  <CardStaticWrapper>

    <div className="p-3 ">
      <fieldset className="mb-6">
        <legend className="font-semibold mb-2">What is your area of art?</legend>
        <div className="flex flex-row gap-4  items-center   text-black">
          {["visual", "music", "both"].map((type) => (
            <FiltersWrapper>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="artistType"
                  value={type}
                  checked={artistType === type}
                  onChange={() => setArtistType(type)}
                  className="peer hidden"
                />
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center transition
                    ${artistType === type ? 'bg-monza border-black' : 'bg-white border-black'}
                  `}
                >
                  {artistType === type && (
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                    // piccolo cerchio bianco dentro (classico per radio)
                  )}
                </div>
                <span>
                  {type === "visual"
                    ? "Artista Visuale"
                    : type === "music"
                      ? "Musicista"
                      : "Entrambi"}
                </span>
              </label>
            </FiltersWrapper>

          ))}
        </div>
      </fieldset>

      <div>
        <label className="block font-medium mb-1 text-black mt-2">Nome e Cognome</label>
        <input
          type="text"
          name="name"
          value={formBase.name}
          onChange={handleBaseInputChange}
          className="p-3 border-[1px] border-black text-base w-full text-black"
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1 text-black mt-2">Email</label>
        <input
          type="email"
          name="email"
          value={formBase.email}
          onChange={handleBaseInputChange}
          className="p-3 border-[1px] border-black text-base w-full text-black"
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1 text-black mt-2">Tell us a bit about yourselves...</label>
        <textarea
          name="message"
          value={formBase.message}
          onChange={handleBaseInputChange}
          className="p-3 border-[1px] border-black text-base  w-full text-black"
          rows={4}
          required
        />
      </div>
    </div>
  </CardStaticWrapper>
);

export default Step1BaseInfo;
