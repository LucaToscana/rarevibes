import CardWrapper from "./CardWrapper";

export default function SectionTitle({ children }) {
  return (
    <div className="w-fit">
    <CardWrapper>
      <h2 className="text-xs   font-bold font-heming uppercase">
        {children}
      </h2>
    </CardWrapper>
    </div>
  )
}
