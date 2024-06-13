const { useEffect } = require("react")

const useTittle = title => {
  useEffect(() => {
    document.title = `${title} - Buy & Sell`
  }, [title]);
}

export default useTittle;