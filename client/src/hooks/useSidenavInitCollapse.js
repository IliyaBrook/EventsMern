import {useEffect} from "react"


export const useSidenavInitCollapse = (ref) => {
	const winEventId = (event) => {
		if (ref.current && ref.current.contains(event.target)) {
			const instance = M.Sidenav.getInstance(ref.current)
			instance.close()
		}
	}
	useEffect(() => {
		window.M.Sidenav.init(ref.current)
		window.addEventListener("click", winEventId)
	}, [])
	return () => removeEventListener("click", winEventId)
}