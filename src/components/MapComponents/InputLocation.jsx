const InputLocation = () => {
  return (
    <>    
        <input type="text" placeholder="Buscar en ParkNow..."  className="outline-none border-none" disabled title="Búsqueda deshabilitada"/>
        <button>
            <img src="/images/search-icon.png" alt="Icono de búsqueda" width={24} height={24}/>
        </button>
    </>
  )
}

export default InputLocation

