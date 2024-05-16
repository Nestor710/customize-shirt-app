import { motion, AnimatePresence } from "framer-motion"
import { useSnapshot } from "valtio"
import { fadeAnimation, slideAnimation } from "../config/motion"
import { DecalTypes, EditorTabs, FilterTabs } from "../config/constants"
import { reader } from "../config/helpers"
import state from "../store"
import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from "../components"
import { useState } from "react"

const Customizer = () => {

  const snap = useSnapshot(state)
  const [file, setFile] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState('');
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  // show tab content depending on the activeTab

  const handleSubmit = async (type) => {
    if (!prompt) return alert('Please enter a prompt')

    try {
      // call our backend to generate an ai
      
    } catch (error) {
      alert(error)
    } finally {
      setGeneratingImg(false)
      setActiveEditorTab("")
    }
  }

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker/>
      case "filepicker":
        return <FilePicker
                file={file}
                setFile={setFile}
                readFile={readFile}
              />
      case "aipicker":
        return <AIPicker
                prompt={prompt}
                setPrompt={setPrompt}
                generatingImg={generatingImg}
                handleSubmit={handleSubmit}
              />
      default:
        return null
    }
  }

  const handleActiveFilerTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName]
        break;
      case "stylishShirt":
        state.isFUllTexture = !activeFilterTab[tabName]
        break;
      default:
        state.isFUllTexture = true;
        state.isLogoTexture = true;
    }

    // ofter setting the state, activeFilterTab is updated

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName]
      }
    })
  }

  const handleDecals = (type, result) => {
    const decailType = DecalTypes[type]
    state[decailType.stateProperty] = result

    if (!activeFilterTab[decailType.filterTab]) {
      handleActiveFilerTab(DecalTypes.filterTab)
    }
  }

  const readFile = (type) => {
    reader(file)
    .then((result) => {
      handleDecals(type, result)
      setActiveEditorTab("")
    })
  }

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation('left')}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>
          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Go Back"
              handleClick={() => state.intro = true}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>
          <motion.div
            className="filtertabs-container"
            {...slideAnimation('up')}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilerTab(tab.name)}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer