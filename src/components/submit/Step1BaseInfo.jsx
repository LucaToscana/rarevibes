import CardStaticWrapper from "../layout/CardStaticWrapper";

const Step1BaseInfo = ({ artistType, setArtistType, formBase, handleBaseInputChange }) => (
  
  <CardStaticWrapper>

    <div className="p-3 ">
      <fieldset className="mb-6">
        <legend className="font-semibold mb-2">What is your area of art?</legend>
        <div className="flex flex-wrap gap-4 text-black">
          {["visual", "music", "both"].map((type) => (
            <label key={type} className="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                name="artistType"
                value={type}
                checked={artistType === type}
                onChange={() => setArtistType(type)}
                className="p-3 border-[1px] border-black text-base transition-transform focus:outline-none focus:scale-105 w-full"
              />
              {type === "visual" ? "Artista Visuale" : type === "music" ? "Musicista" : "Entrambi"}
            </label>
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
