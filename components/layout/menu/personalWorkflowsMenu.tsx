import { NavDropdown } from "react-bootstrap"

function PersonalWorkflowsMenu() {
    return (        
        <NavDropdown title="Flussi di lavoro" id="personal-workflows">
          <NavDropdown.Item href="#action/3.1">Mie richieste di cambio reperibilità</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.9">Mie richieste di ferie</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.9">Mie riposi compensativi</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.9">Mie permessi personali</NavDropdown.Item>
        </NavDropdown>
    )
}

export default PersonalWorkflowsMenu