import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export const metadata = {
    title: "Contact Us - Rooli",
    description: "Get in touch with Rooli (Cresthub Media Limited)",
}

export default function ContactUsPage() {
    return (
        <div className="min-h-screen bg-background">
            <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center space-x-2">

                            <span className="font-serif font-bold text-xl text-foreground">
                                <Image src="/logo.png" alt="Rooli" width={68} height={68} />
                            </span>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/">Back to Home</Link>
                        </Button>
                    </div>
                </div>
            </header>

            <section className="py-20 bg-muted/20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="font-serif font-bold text-4xl lg:text-5xl text-foreground mb-4">
                            Contact Us
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            You can contact us through the following means
                        </p>
                    </div>

                    <div className="overflow-x-auto border border-border rounded-xl bg-background">
                        <table className="w-full text-left">
                            <thead className="bg-muted/40">
                                <tr>
                                    <th className="p-4 font-semibold text-foreground">Detail</th>
                                    <th className="p-4 font-semibold text-foreground">Information</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-t border-border">
                                    <td className="p-4 text-muted-foreground">Parent Company</td>
                                    <td className="p-4 text-foreground">Cresthub Media Limited</td>
                                </tr>
                                <tr className="border-t border-border">
                                    <td className="p-4 text-muted-foreground">Focus</td>
                                    <td className="p-4 text-foreground">Technology, Media, and Digital Services</td>
                                </tr>
                                <tr className="border-t border-border">
                                    <td className="p-4 text-muted-foreground">Heritage</td>
                                    <td className="p-4 text-foreground">Sharing Africa's business and tech stories since 2015.</td>
                                </tr>
                                <tr className="border-t border-border">
                                    <td className="p-4 text-muted-foreground">Registration No.</td>
                                    <td className="p-4 text-foreground">1913610</td>
                                </tr>
                                <tr className="border-t border-border">
                                    <td className="p-4 text-muted-foreground">Headquarters</td>
                                    <td className="p-4 text-foreground">RAYFIELD, JOS, PLATEAU STATE, NIGERIA</td>
                                </tr>
                                <tr className="border-t border-border">
                                    <td className="p-4 text-muted-foreground">Email</td>
                                    <td className="p-4 text-foreground">Rooli[at]cresthub.com</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    )
}
