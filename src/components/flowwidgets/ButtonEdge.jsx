import React, {useCallback} from "react"
import { BaseEdge, EdgeLabelRenderer, getBezierPath, useReactFlow } from "reactflow"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./buttonedge.css"



// const onEdgeClick = (evt, id) => {
//   evt.stopPropagation()
  
//   alert(`remove ${id}`)
// }

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd
}) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  })
  const reactFlow = useReactFlow()
  const onEdgeClick = useCallback(
    (evt, id) => {
      evt.stopPropagation()
      reactFlow.setEdges((edges) => edges.filter((edge) => edge.id !== id))
    },
    [reactFlow]
  )
  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            // everything inside EdgeLabelRenderer has no pointer events by default
            // if you have an interactive element, set pointer-events: all
            pointerEvents: "all"
          }}
          className="nodrag nopan"
        >
          <button
            className="edgebutton"
            onClick={event => onEdgeClick(event, id)}
          >
            <FontAwesomeIcon icon="fa-solid fa-remove" />
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  )
}
