export const viewFinderStyle = {
    top: 0,
    left: 0,
    zIndex: 1,
    boxSizing: 'border-box',
    border: '50px solid rgb(199 180 180 / 35%)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    boxShadow : 'rgb(110 255 0 / 50%) 0px 0px 0px 3px inset',
  }

export const containerStyle = {
overflow: 'hidden',
position: 'relative',
width: '50%',
paddingTop: '100%',
}

export const hiddenStyle = { display: 'none' }

export const previewStyle = {
top: 0,
left: 0,
display: 'block',
position: 'absolute',
overflow: 'hidden',
width: '100%',
height: '100%',
}

export const videoPreviewStyle = {
...previewStyle,
objectFit: 'cover',
transform: this.state.mirrorVideo ? 'scaleX(-1)' : undefined,
}

export const imgPreviewStyle = {
...previewStyle,
objectFit: 'scale-down',
}

