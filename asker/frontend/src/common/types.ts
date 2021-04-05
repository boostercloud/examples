export type Question = {
  id: string
  conferenceId: string
  questioner: string
  text: string
  claps: number
  createdAt: string
}

export const countLikes = (questions: Question[]) => {
  return questions?.reduce((acc: number, currentValue: Question) => acc + currentValue.claps, 0);
} 