import DietForm from './DietForm'
import { DietFormProvider } from './DietFormContext'
import DietFormError from './DietFormError'
import DietFormLoading from './DietFormLoading'
import DietFormSuccess from './DietFormSuccess'
import DietStep from './DietStep'

export default function DietStepper() {
  return (
    <>
      <DietStep step="select-preferences">
        <DietFormProvider>
          <DietForm />
        </DietFormProvider>
      </DietStep>
      <DietStep step="loading">
        <DietFormLoading />
      </DietStep>
      <DietStep step="success">
        <DietFormSuccess />
      </DietStep>
      <DietStep step="error">
        <DietFormError />
      </DietStep>
    </>
  )
}
