import React from 'react'
import AddStep from '../containers/AddStep'
import ActualProof from '../containers/ActualProof'
import ActualLanguage from '../containers/ActualLanguage'
import UndoRedo from '../containers/UndoRedo'
import ImportExport from '../containers/ImportExport'

const App = ({initState}) => (
  <div>
    <UndoRedo />
    <ImportExport initState = {initState} />
    <ActualLanguage />
    <ActualProof />
    <AddStep />
  </div>
)

export default App