import Link from "next/link";
import Wrapper from "@/components/wrapper";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine, CheckCircle, Blocks, Gem, Leaf } from "lucide-react";
import ProductReel from "@/components/ProductReel";

export default async function Home() {
  // const hello = await api.post.hello.query({ text: "from tRPC" });
  const session = null;

  const items = [
    {
      name: "Instant Delivery",
      Icon: ArrowDownToLine,
      description:
        "Get your assets delivered to your email in seconds and download them right away.",
    },
    {
      name: "Quality Guaranteed",
      Icon: Gem,
      description:
        "Every asset on our platform is verified by our team to ensure our highest quality standards. Not happy? We offer a 30-day refund guarantee.",
    },
    {
      name: "For the Planet",
      Icon: Leaf,
      description:
        "We care about the environment and have taken steps to reduce our carbon footprint.",
    },
  ];

  return (
    <>
      <Wrapper>
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-center py-20 text-center">
          <div className="text-4xl font-bold tracking-tight text-black sm:text-6xl">
            High-quality digital assets{" "}
            <div className="text-pyrply mt-2">all in one place</div>
          </div>
          <p className="m-6 mx-auto max-w-prose text-center text-sm text-black md:max-w-2xl md:text-xl">
            Welcome to DigitalOctopus - the vibrant ecosystem connecting
            creators, artists and digital enthusiasts. Whether you're a designer
            or a buyer.
          </p>
          <div className="mt-6 flex gap-4 md:flex-col">
            <Button asChild variant="default" className=" hover:bg-pyrply/80">
              <Link href="/products">Browse Trending</Link>
            </Button>
            <Button variant="ghost">Our quality promise &rarr;</Button>
          </div>
        </div>
        <ProductReel
          title={"Trending"}
          href="/products"
          query={{ limit: 4, sort: "desc" }}
        />
      </Wrapper>
      <section className="border-t border-gray-200 bg-pyrply2/5">
        <Wrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12  sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {items.map((item) => (
              <div
                key={item.name}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
              >
                <div className="flex justify-center md:flex-shrink-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pyrply2/10 text-pyrply">
                    {<item.Icon className="h-1/3 w-1/3" />}
                  </div>
                </div>

                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-gray-900">
                    {item.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground ">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Wrapper>
      </section>
    </>
  );
}
