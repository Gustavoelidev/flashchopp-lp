/* Moldura de celular usada nos mockups (Hero e Loja online) */
export function Phone({ className = '', children }) {
  return (
    <div className={`flex w-[296px] flex-col rounded-[38px] bg-navy-deep p-[7px] ${className}`}>
      <div className="flex flex-1 flex-col overflow-hidden rounded-[31px] bg-white">
        <div className="flex items-center justify-between px-5 pt-[14px] pb-[6px]">
          <span className="text-[11.5px] font-semibold text-navy">9:41</span>
          <span className="flex items-end gap-[3px]">
            {['h-[4px]', 'h-[6px]', 'h-[8px]', 'h-[10px]'].map((h) => (
              <span key={h} className={`w-[2.5px] rounded-[1px] bg-navy ${h}`} />
            ))}
          </span>
        </div>
        {children}
      </div>
    </div>
  )
}
