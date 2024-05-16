import { useSnapshot } from "valtio"
import { PropTypes } from 'prop-types'

import state from "../store"

const Tab = ({
  tab,
  handleClick,
  isFilterTab,
  isActiveTab
}) => {
  const snap = useSnapshot(state)

  const activeStyles = isFilterTab & isActiveTab
  ? { backgroundColor: snap.color, opacity: 0.5 }
  : { backgroundColor: "transparent", opacity: 1 }

  return (
    <div 
      key={tab.name}
      className={`tab-btn ${isActiveTab ? 'rounded-full glassmorhism' : 'rounded-4'}`}
      onClick={handleClick}
      style={{ ...activeStyles }}
    >
      <img 
        src={tab.icon}
        alt={tab.name}
        className={`${ isFilterTab ? 'w-2/3 h-2/3' : 'w-11/12 h-11/2 object-contain' }`}
      />
    </div>
  )
}

Tab.propTypes = {
  tab: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  isFilterTab: PropTypes.bool,
  isActiveTab: PropTypes.bool
}

export default Tab