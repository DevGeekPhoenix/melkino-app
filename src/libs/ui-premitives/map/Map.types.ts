export interface MapProps {
  position: [number, number]
  onPositionChanged?: (position: [number, number]) => void
  popupText?: string
  dragging: boolean
}
