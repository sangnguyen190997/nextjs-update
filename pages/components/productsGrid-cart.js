export default function ProductsGridCart({ children }) {
  return (
    <div className="grid grid-cols-1 gap-1">
      {children}
      <style jsx>{`
        .products-grid {
          display: grid;
          grid-gap: 28px;
          grid: auto-flow / 1fr 1fr 1fr;
        }
        @media (min-width: 1650px) {
          .products-grid {
            grid: auto-flow / 1fr 1fr 1fr;
          }
        }
        @media (max-width: 1360px) {
          .products-grid {
            grid: auto-flow / 1fr 1fr;
          }
        }
        @media (max-width: 700px) {
          .products-grid {
            grid: auto-flow / 1fr;
          }
        }
      `}</style>
    </div>
  );
}
