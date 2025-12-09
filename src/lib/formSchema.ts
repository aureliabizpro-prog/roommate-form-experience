import { z } from 'zod';

export const formSchema = z.object({
  // Section 1
  email: z.string({ required_error: "Email 為必填欄位" }).email({ message: "請輸入有效的 Email 地址" }),

  // Section 2
  q2_routine: z.string({ required_error: "作息為必填選項" }),
  q3_bathroom_preference: z.string({ required_error: "衛浴使用偏好為必填選項" }),
  q4_cleaning_habits: z.string({ required_error: "打掃習慣為必填選項" }),
  q5_friends_over: z.string({ required_error: "帶朋友回家接受程度為必填選項" }),
  q6_pets: z.string({ required_error: "寵物接受程度為必填選項" }),

  // Section 3
  q7_bathroom_schedule: z.string().optional(),

  // Section 4
  q8_noise_sensitivity: z.string({ required_error: "噪音敏感度為必填選項" }),
  q9_roommate_interaction: z.string({ required_error: "理想相處方式為必填選項" }),
  q10_renting_experience: z.string({ required_error: "合租經驗為必填選項" }),

  // Section 5
  q11_gender: z.string({ required_error: "生理性別為必填選項" }),
  q12_gender_identity: z.string({ required_error: "性別認同為必填選項" }),

  // Section 6
  q13_roommate_gender_preference: z.array(z.string()).min(1, { message: "室友性別偏好為必填選項" }),

  // Section 7
  q14_location: z.string({ required_error: "租屋地區為必填欄位" }).min(1, { message: "請至少填寫一個地區" }),
  q15_rent_budget: z.string({ required_error: "租金預算為必填選項" }),
  q16_move_in_date: z.string({ required_error: "起租日為必填欄位" }),
  q17_allergies: z.array(z.string()).min(1, { message: "過敏原為必填選項" }),
  q18_smoking_habit: z.string({ required_error: "抽菸習慣為必填選項" }),
  
  // Section 8
  q19_additional_notes: z.string().optional(),
});

export type FormData = z.infer<typeof formSchema>;