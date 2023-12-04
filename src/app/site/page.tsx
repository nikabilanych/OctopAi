import Link from "next/link";
import Wrapper from "@/components/wrapper";
import { Button, buttonVariants } from "@/components/ui/button";

import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { ArrowDownToLine, CheckCircle, Blocks, Gem, Leaf } from "lucide-react";

export default async function Home() {
  // const hello = await api.post.hello.query({ text: "from tRPC" });
  const session = await getServerAuthSession();

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
        <div className="flex max-w-3xl flex-col items-center justify-center gap-4 py-20">
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
            High-quality digital assets{" "}
            <span className="text-pyrply">all in one place</span>
          </h1>
          <p className="text-whyte m-6 mx-auto max-w-prose text-center text-sm md:max-w-2xl md:text-xl">
            Explore our vibrant ecosystem that connects creators, artists and
            digital enthusiasts. Whether you're a designer or a buyer.
          </p>
          <div className="mt-6 flex gap-4 md:flex-col">
            <Link href="/products" className={buttonVariants()}>
              Browse Trending
            </Link>
            <Button variant="ghost">Our quality promise &rarr;</Button>
          </div>
        </div>
        {/* TODO: DISPLAY POST */}
      </Wrapper>
      <section className="border-t border-gray-200 bg-gray-50">
        <Wrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {items.map((item) => (
              <div
                key={item.name}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
              >
                <div className="flex justify-center md:flex-shrink-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-900">
                    {<item.Icon className="h-1/3 w-1/3" />}
                  </div>
                </div>

                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-gray-900">
                    {item.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
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
//     <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
//       <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
//         <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
//           Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
//         </h1>
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
//           <Link
//             className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
//             href="https://create.t3.gg/en/usage/first-steps"
//             target="_blank"
//           >
//             <h3 className="text-2xl font-bold">First Steps →</h3>
//             <div className="text-lg">
//               Just the basics - Everything you need to know to set up your
//               database and authentication.
//             </div>
//           </Link>
//           <Link
//             className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
//             href="https://create.t3.gg/en/introduction"
//             target="_blank"
//           >
//             <h3 className="text-2xl font-bold">Documentation →</h3>
//             <div className="text-lg">
//               Learn more about Create T3 App, the libraries it uses, and how to
//               deploy it.
//             </div>
//           </Link>
//         </div>
//         <div className="flex flex-col items-center gap-2">
//           <p className="text-2xl text-white">
//             {hello ? hello.greeting : "Loading tRPC query..."}
//           </p>

//           <div className="flex flex-col items-center justify-center gap-4">
//             <p className="text-center text-2xl text-white">
//               {session && <span>Logged in as {session.user?.name}</span>}
//             </p>
//             <Link
//               href={session ? "/api/auth/signout" : "/api/auth/signin"}
//               className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
//             >
//               {session ? "Sign out" : "Sign in"}
//             </Link>
//           </div>
//         </div>

//         <CrudShowcase />
//       </div>
//     </main>
//   );
// }

// async function CrudShowcase() {
//   const session = await getServerAuthSession();
//   if (!session?.user) return null;

//   const latestPost = await api.post.getLatest.query();

//   return (
//     <div className="w-full max-w-xs">
//       {latestPost ? (
//         <p className="truncate">Your most recent post: {latestPost.name}</p>
//       ) : (
//         <p>You have no posts yet.</p>
//       )}

//       <CreatePost />
//     </div>
//   );
// }
