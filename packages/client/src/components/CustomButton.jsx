import PropTypes from 'prop-types'
import state from '../store'
import { getContrastingColor } from '../config/helpers'
import { useSnapshot } from 'valtio'

const CustomButton = ({
    type,
    title,
    handleClick,
    customStyles
}) => {
    const snap = useSnapshot(state)
    const generateStyles = (type) => {
        if (type === 'filled') {
            return {
                backgroundColor: snap.color,
                color: getContrastingColor(snap.color)
            }
        } else if (type === 'outline') {
            return {
                borderWidth: '1px',
                borderColor: snap.color,
                color: snap.color
            }
        }
    }
    return (
        <button 
            onClick={handleClick}
            className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
            style={generateStyles(type)}
        >
            {title}
        </button>
    )
}

CustomButton.propTypes = {
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
    customStyles: PropTypes.string
}

export default CustomButton