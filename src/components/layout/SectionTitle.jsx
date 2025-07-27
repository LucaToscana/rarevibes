import CardWrapper from "./CardWrapper";

export default function SectionTitle({ children }) {
  return (
    <div className="w-fit">
    <CardWrapper>
      <h2 className="text-2xl font-bold font-arvo uppercase">
        {children}
      </h2>
    </CardWrapper>
    </div>
  )
}
