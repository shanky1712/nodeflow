import { MarkerType } from "reactflow";

const initialNodes = [
  {
    id: 'interaction-1',
    type: 'input',
    data: { label: 'Node 1' },
    sourcePosition: 'right',
    className: 'nowheel nodrag',
    deletable: true,
    position: { x: 10, y: 10 },
  },
  {
    id: 'interaction-2',
    data: { label: 'Node 2' },
    position: { x: 300, y: -50 },
    type:'textUpdater',
    sourcePosition: 'right',
    targetPosition: 'left',
  },
  {
    id: 'interaction-3',
    data: { label: 'Node 3' },
    position: { x: 300, y: 50 },
    type:'textUpdater',
    sourcePosition: 'right',
    targetPosition: 'left',
  },
  {
    id: 'interaction-4',
    data: { label: 'Node 4' },
    type: 'textUpdater',
    position: { x: 500, y: -50 },
    sourcePosition: 'right',
    targetPosition: 'left',
  },
];

const initialEdges = [
  {
    id: 'interaction-e1-2',
    source: 'interaction-1',
    target: 'interaction-2',
    

  },
  { 
    id: 'interaction-e1-3', 
    source: 'interaction-1', 
    // type: 'buttonedge', 
    target: 'interaction-3' 
  },
  { 
    id: 'interaction-e1-4', 
    source: 'interaction-1', 
    // type: 'buttonedge', 
    target: 'interaction-4' 
  },
];

  export { initialEdges, initialNodes };