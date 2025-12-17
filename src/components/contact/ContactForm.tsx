import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const US_STATE_CODES = [
  201, 202, 203, 205, 206, 207, 208, 209, 210, 212, 213, 214, 215, 216, 217,
  218, 219, 220, 224, 225, 228, 229, 231, 234, 239, 240, 248, 251, 252, 253,
  254, 256, 260, 262, 267, 269, 270, 272, 276, 281, 301, 302, 303, 304, 305,
  307, 308, 309, 310, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 323,
  325, 330, 331, 334, 336, 337, 339, 346, 347, 351, 352, 360, 361, 364, 380,
  385, 386, 401, 402, 404, 405, 406, 407, 408, 409, 410, 412, 413, 414, 415,
  417, 419, 423, 424, 425, 430, 432, 434, 435, 440, 442, 443, 458, 463, 469,
  470, 475, 478, 479, 480, 484, 501, 502, 503, 504, 505, 507, 508, 509, 510,
  512, 513, 515, 516, 517, 518, 520, 530, 531, 534, 539, 540, 541, 551, 559,
  561, 562, 563, 564, 567, 570, 571, 573, 574, 575, 580, 585, 586, 601, 602,
  603, 605, 606, 607, 608, 609, 610, 612, 614, 615, 616, 617, 618, 619, 620,
  623, 626, 628, 629, 630, 631, 636, 641, 646, 650, 651, 657, 660, 661, 662,
  667, 669, 678, 681, 682, 701, 702, 703, 704, 706, 707, 708, 712, 713, 714,
  715, 716, 717, 718, 719, 720, 724, 725, 727, 731, 732, 734, 737, 740, 743,
  747, 754, 757, 760, 762, 763, 765, 769, 770, 772, 773, 774, 775, 779, 781,
  785, 786, 801, 802, 803, 804, 805, 806, 808, 810, 812, 813, 814, 815, 816,
  817, 818, 828, 830, 831, 832, 843, 845, 847, 848, 850, 854, 856, 857, 858,
  859, 860, 862, 863, 864, 865, 870, 872, 878, 901, 903, 904, 906, 907, 908,
  909, 910, 912, 913, 914, 915, 916, 917, 918, 919, 920, 925, 928, 929, 930,
  931, 934, 936, 937, 938, 940, 941, 947, 949, 951, 952, 954, 956, 959, 970,
  971, 972, 973, 978, 979, 980, 984, 985, 989,
]

const formSchema = z.object({
  yourName: z.string().min(1, 'Name is required'),
  businessName: z.string().min(1, 'Business name is required'),
  phone: z
    .string()
    .min(1, 'Phone is required')
    .refine((val) => {
      const areaCode = val.replace(/\D/g, '').substring(0, 3)
      return US_STATE_CODES.includes(parseInt(areaCode))
    }, 'Invalid US area code'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(1, 'Message is required'),
})

type FormValues = z.infer<typeof formSchema>

export function ContactForm() {
  const { t } = useTranslation('common')

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      yourName: '',
      businessName: '',
      phone: '',
      email: '',
      message: '',
    },
  })

  function onSubmit(values: FormValues) {
    console.log(values)
  }

  return (
    <div className="max-w-xl mx-auto ">
      <div className="mb-6 text-center md:mb-8">
        <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-neutral-900">
          {t('contact.leave_us_message')}
        </h2>
        <p className="text-sm md:text-base text-neutral-500">
          {t('contact.contact_message')}
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 md:space-y-6"
        >
          <FormField
            control={form.control}
            name="yourName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('your_name')}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('business_name')}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('phone')}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="(555) 000-0000" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('email')}</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('message')}</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={4}
                    placeholder={t('contact.share_thought')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            size="responsive"
            variant={'solid'}
            className="w-full md:w-auto"
          >
            {t('contact.send_message')}
          </Button>
        </form>
      </Form>
    </div>
  )
}
