import { ReactNode } from "react"

export const Section: React.FC<{children?: ReactNode}> = ({children}) => <section className="text-gray-700">{children}</section>
export const UL: React.FC<{ children?: ReactNode }> = ({ children }) => <ul className="list-disc list-inside">{children}</ul>

export const SectionHeader: React.FC<{ text?: string, children?: ReactNode }> = ({ text, children }) => <div>
  <h1 className="text-xl text-gray-600 tracking-widest">
    {text}
    {children}
  </h1>
  <div className="mt-8" />
</div>
