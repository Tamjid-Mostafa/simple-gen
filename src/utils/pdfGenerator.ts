import { WorkoutPlan } from '@/components/workout/types'
import { jsPDF } from 'jspdf'

export const generatePDF = (workoutPlan: WorkoutPlan) => {
  const doc = new jsPDF()
  
  // Add title
  doc.setFontSize(20)
  doc.text('Workout Plan', 105, 15, { align: 'center' })
  
  // Add member information
  doc.setFontSize(12)
  doc.text(`Name: ${workoutPlan.member.name}`, 20, 30)
  doc.text(`Email: ${workoutPlan.member.email}`, 20, 37)
  if (workoutPlan.member.age) doc.text(`Age: ${workoutPlan.member.age}`, 20, 44)
  if (workoutPlan.member.weight) doc.text(`Weight: ${workoutPlan.member.weight} kg`, 20, 51)
  if (workoutPlan.member.notes) doc.text(`Notes: ${workoutPlan.member.notes}`, 20, 58)

  // Add exercises
  doc.setFontSize(16)
  doc.text('Exercises:', 20, 70)
  
  let yPos = 80
  workoutPlan.exercises.forEach((exercise, index) => {
    doc.setFontSize(14)
    doc.text(`${index + 1}. ${exercise.name}`, 25, yPos)
    yPos += 7
    doc.setFontSize(12)
    if (exercise.sets && exercise.reps) {
      doc.text(`   Sets: ${exercise.sets}, Reps: ${exercise.reps}`, 30, yPos)
      yPos += 7
    }
    if (exercise.duration) {
      doc.text(`   Duration: ${exercise.duration} seconds`, 30, yPos)
      yPos += 7
    }
    if (exercise.notes) {
      doc.text(`   Notes: ${exercise.notes}`, 30, yPos)
      yPos += 7
    }
    yPos += 3
    
    // Add a new page if we're near the bottom
    if (yPos > 270) {
      doc.addPage()
      yPos = 20
    }
  })
  
  // Save the PDF
  doc.save('workout-plan.pdf')
}

