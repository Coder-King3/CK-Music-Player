import React, { memo, useState } from 'react'

const LazyImage = memo(({ style = {}, ...attrs }) => {
  const [opacity, setOpacity] = useState(0)

  return (
    <img
      {...attrs}
      style={{
        ...style,
        opacity,
        transition: 'opacity 500ms cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      loading="lazy"
      onLoad={() => setOpacity(1)}
    />
  )
})

export default LazyImage
