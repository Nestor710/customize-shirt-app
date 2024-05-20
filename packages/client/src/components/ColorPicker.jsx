import { SketchPicker, SwatchesPicker } from 'react-color'
import { useSnapshot } from 'valtio'
import state from '../store'

const ColorPicker = () => {
  const snap = useSnapshot(state)
  
  return (
    <div className="glassmorphism p-1 rounded-md absolute left-full ml-3 min-w-44">
      <div className="p-1">
        { snap.isTextureGradient ? (
          <>
            <SwatchesPicker onChange={(color) => state.gradientColors.push(color.hex)} className={`${snap.gradientColors.length <= 0 ? 'mb-2' : ''}`}  height={170} width={160} />
            {snap.gradientColors.length > 0 && 
              <div className="py-2">
                <span className="text-xs">
                  Gradient Colors Selected:
                </span>
                <div className="grid grid-cols-8 gap-y-2">
                  {snap.gradientColors.map((color, i) => (
                    <div key={`${color}-${i}`} className={`h-4 w-4 rounded-[4px]`} style={{ backgroundColor: color }}/>
                  ))}
                </div>
              </div>
            }
          </>
        ) : (
          <SketchPicker
            className="mb-2"
            color={snap.color}
            disableAlpha
            onChange={(color) => state.color = color.hex}
          />
        )
        }
      </div>
      {/* <div className="flex m-auto gap-3">
        <CustomButton 
          type="outline"
          title="Gradient"
          handleClick={() => state.isTextureGradient = true}
          customStyles="text-xs"
        />
        <CustomButton 
          type="filled"
          title="One color"
          handleClick={() => state.isTextureGradient = false}
          customStyles="text-xs"
        />
      </div> */}
    </div>
  )
}

export default ColorPicker