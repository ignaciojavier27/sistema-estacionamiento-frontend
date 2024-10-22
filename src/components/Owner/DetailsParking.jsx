
const DetailsParking = () => {
  return (
    <section className='mt-5 ms-3 p-5 border rounded-3 shadow'>
        <h3 className="text-center">Datos del estacionamiento</h3>
        <article className="mt-3 p-3 border border-2 rounded bg-light shadow ">
            <h4 className="fs-5 text-center fw-bold">Ingresos del día: 
                <span className="text-center fs-5 text-success"> $12000</span>
            </h4>
        </article>
        <article className="mt-3 p-3 border border-2 rounded bg-light shadow ">
            <h4 className="fs-5 text-center fw-bold">Ingresos del mes: 
                <span className="text-center fs-5 text-success"> $12000</span>
            </h4>
        </article>
        <article className="mt-3 p-3 border border-2 rounded bg-light shadow ">
            <h4 className="fs-5 text-center fw-bold">Ingresos del año: 
                <span className="text-center fs-5 text-success"> $12000</span>
            </h4>
        </article>
    </section>
  )
}

export default DetailsParking
