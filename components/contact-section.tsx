"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field"
import {
Send,
Mail,
MapPin,
Clock,
CheckCircle
} from "lucide-react"

interface FormData {
name: string
email: string
subject: string
message: string
}

interface FormErrors {
name?: string
email?: string
subject?: string
message?: string
}

export function ContactSection() {

const [formData, setFormData] = useState<FormData>({
name: "",
email: "",
subject: "",
message: ""
})

const [errors, setErrors] = useState<FormErrors>({})
const [isSubmitted, setIsSubmitted] = useState(false)

const validateForm = (): boolean => {

const newErrors: FormErrors = {}

if (!formData.name.trim()) {
newErrors.name = "Name is required"
}

if (!formData.email.trim()) {
newErrors.email = "Email is required"
} else if (!/^[^\s@]+@[^\s@]+.[^\s@]+$/.test(formData.email)) {
newErrors.email = "Please enter a valid email"
}

if (!formData.subject.trim()) {
newErrors.subject = "Subject is required"
}

if (!formData.message.trim()) {
newErrors.message = "Message is required"
}

setErrors(newErrors)
return Object.keys(newErrors).length === 0
}

const handleSubmit = (e: React.FormEvent) => {
e.preventDefault()

if (!validateForm()) return

const { name, email, subject, message } = formData

const mailtoLink =
mailto:ashukr3384@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}
)}

window.location.href = mailtoLink

setIsSubmitted(true)

setFormData({
name: "",
email: "",
subject: "",
message: ""
})
}

const handleChange = (
e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {

const { name, value } = e.target

setFormData(prev => ({
...prev,
[name]: value
}))

if (errors[name as keyof FormErrors]) {
setErrors(prev => ({
...prev,
[name]: undefined
}))
}
}

return (

<section id="contact" className="py-24 sm:py-32 bg-secondary/30"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-6xl mx-auto"><div className="text-center mb-16"><span className="text-primary font-mono text-sm uppercase">
Get In Touch
</span><h2 className="text-3xl sm:text-4xl font-bold mt-4">
Let's Work Together
</h2><p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
Have a project in mind or just want to chat? I'd love to hear from you.
</p></div><div className="grid lg:grid-cols-5 gap-12"><div className="lg:col-span-2 space-y-8"><h3 className="text-xl font-semibold mb-6">
Contact Information
</h3><div className="space-y-4"><div className="flex items-center gap-4"><div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
<Mail className="h-5 w-5 text-primary" />
</div><div><p className="text-sm text-muted-foreground">Email</p><a href="mailto:ashukr3384@gmail.com" className="font-medium">
ashukr3384@gmail.com
</a></div></div><div className="flex items-center gap-4"><div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
<MapPin className="h-5 w-5 text-primary" />
</div><div><p className="text-sm text-muted-foreground">Location</p><p className="font-medium">
Bihar Sharif, Bihar, India
</p></div></div><div className="flex items-center gap-4"><div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
<Clock className="h-5 w-5 text-primary" />
</div><div><p className="text-sm text-muted-foreground">Response Time</p><p className="font-medium">
Within 24 hours
</p></div></div></div></div><div className="lg:col-span-3"><div className="p-8 rounded-2xl bg-card border border-border">{isSubmitted ? (

<div className="text-center py-10"><CheckCircle className="mx-auto mb-4 h-10 w-10 text-green-500" /><h3 className="text-xl font-semibold">
Email Client Opened
</h3><p className="text-muted-foreground">
Please send the email from your mail app.
</p></div>) : (

<form onSubmit={handleSubmit}><FieldGroup><div className="grid sm:grid-cols-2 gap-6"><Field data-invalid={!!errors.name}><FieldLabel htmlFor="name">Name</FieldLabel>

<Input
id="name"
name="name"
placeholder="Your name"
value={formData.name}
onChange={handleChange}
/>

{errors.name && <FieldError>{errors.name}</FieldError>}

</Field><Field data-invalid={!!errors.email}><FieldLabel htmlFor="email">Email</FieldLabel>

<Input
id="email"
name="email"
type="email"
placeholder="you@email.com"
value={formData.email}
onChange={handleChange}
/>

{errors.email && <FieldError>{errors.email}</FieldError>}

</Field></div><Field data-invalid={!!errors.subject}><FieldLabel htmlFor="subject">Subject</FieldLabel>

<Input
id="subject"
name="subject"
placeholder="Project Inquiry"
value={formData.subject}
onChange={handleChange}
/>

{errors.subject && <FieldError>{errors.subject}</FieldError>}

</Field><Field data-invalid={!!errors.message}><FieldLabel htmlFor="message">Message</FieldLabel>

<Textarea
id="message"
name="message"
rows={5}
placeholder="Tell me about your project..."
value={formData.message}
onChange={handleChange}
/>

{errors.message && <FieldError>{errors.message}</FieldError>}

</Field>

<Button type="submit" size="lg" className="w-full">

<Send className="mr-2 h-4 w-4" />
Send Message

</Button>

</FieldGroup>

</form>

)}

</div>

</div>

</div>

</div>

</div>

</section>

)

}
