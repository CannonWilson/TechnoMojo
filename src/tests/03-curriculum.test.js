/**
* @jest-environment node
*/

const lessonPlan = require('../curriculum/lessonPlan.js')

describe('Test curriculum array', () => {
	
	test('All fields present and none empty', () => {
		
		expect(lessonPlan.length > 0)
		
		for (const module of lessonPlan) {
			expect(module.moduleName).not.toBe("")
			expect(module.lessons.length).toBeGreaterThan(0)
			
			for (const lesson of module.lessons) {
				expect(lesson.lessonName).not.toBe("")
				expect(lesson.lessonDescription).not.toBe("")
				expect(lesson.exerciseDescription).not.toBe("")
				expect(lesson.submissionDescription).not.toBe("")
				expect(lesson.introVideoUrl).not.toBe("")
				expect(lesson.codeSandBoxUrl).not.toBe("")
				expect(lesson.answerVideoUrl).not.toBe("")
				expect(lesson.quiz.length).toBeGreaterThan(0)
				
				for (const q of lesson.quiz) {
					expect(q.question).not.toBe("")
					expect(q.answerChoices).toHaveLength(4)
					expect(q.correctAnswerIndex).toBeGreaterThanOrEqual(0)
					expect(q.correctAnswerIndex).toBeLessThanOrEqual(3)
				}
			}
		}
		
	})
	
	test('All values changed from default', () => {
				
		for (const module of lessonPlan) {
			expect(module.moduleName).not.toBe("Default Module")
			
			for (const lesson of module.lessons) {
				expect(lesson.lessonName).not.toBe("Default Lesson")
				expect(lesson.lessonDescription).not.toBe("Default lesson description")
				expect(lesson.exerciseDescription).not.toBe("Default exercise description text")
				expect(lesson.submissionDescription).not.toBe("Default submission description")
				expect(lesson.introVideoUrl).not.toBe("https://player.vimeo.com/video/")
				expect(lesson.codeSandBoxUrl).not.toBe("https://codesandbox.io/embed/")
				expect(lesson.answerVideoUrl).not.toBe("https://player.vimeo.com/video/")
				
				for (const q of lesson.quiz) {
					expect(q.question).not.toContain('The first question: ')
					expect(q.question).not.toContain('The second question: ')
					expect(q.question).not.toContain('The third question: ')
					expect(q.answerChoices).not.toContain('First answer choice')
					expect(q.answerChoices).not.toContain('Second answer choice')
					expect(q.answerChoices).not.toContain('Third answer choice')
					expect(q.answerChoices).not.toContain('Fourth answer choice')
				}
			}
		}
		
	})
	
})