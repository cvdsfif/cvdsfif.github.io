import "primereact/resources/themes/bootstrap4-light-blue/theme.css"
import 'primeicons/primeicons.css'
import "primeflex/primeflex.css"

export default function App() {
    return <div data-testid="root" className="flex flex-row h-full w-full">
        <div className="flex flex-grow-0">...</div>
        <div className="flex flex-grow-1 align-items-center justify-content-center">
            <img src="/nztransp2407.png" alt="NZ" style={{ maxWidth: "80%", maxHeight: "50%" }} />
        </div>
        <div className="flex flex-grow-0 bg-blue-100">&nbsp;</div>
    </div>
}