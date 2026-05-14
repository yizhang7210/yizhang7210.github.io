---
name: "Meta"
logo: "/logos/meta.png"
order: 9
rating: 6
scope: 8
city: "Menlo Park"
country: "USA"
startDate: "2024-02"
endDate: "2026-05"
---
Despite a lackluster labor market since 2022, hiring activity picked up briefly towards the end of 2023.
I was lucky to have joined that wave and ended up with a few offers to choose from.
I was ready to explore Big Tech, and Meta was about as big as it gets, so I signed up.

Meta's stock had a big surge in January 2024.
To maximize my RSU grant — which was calculated based on a price window just before joining — I rushed through team matching, joined the first team I talked to, and caught the last onboarding group in February 2024.

## The Work

<div class="role-card">

### Software Engineer - Wearables Productivity & Infra (Feb 2024 – Mar 2025)
In true Meta fashion, the team I matched with went through a re-org right around the time I joined, and my official manager changed three times in my first month.
When the dust settled, I was happy to land on the team maintaining the CI/CD pipeline for Meta's Wearables products (e.g. the RayBan Meta glasses and more), as I had worked on internal tooling and was passionate about developer experience.

After a few taster projects for my onboarding, my manager Neil introduced me to a large migration project that had not been progressing smoothly. As teams from multiple programs were re-orged together, a tech lead was needed to consolidate their respective migration efforts, and I was happy to step into it.

I didn't know at the time, but this migration was a bit of a hot potato, as it had high complexity and uncertainty but lacked clear motivations or rewards.
I just put my head down and got to work.
I quickly put together the holistic picture of its current state, identified the areas that needed work, made plans, and started executing, while transparently communicating the progress and the challenges.
Along the way, I helped rebuild some of the trust that was lost with the partner teams.

We made meaningful progress for the migration by the end of the year, but my limited knowledge of and interest in the device code meant that I'd never be able to connect the dots end-to-end and develop a bigger vision of what we were building.

Despite getting an "Exceeding Expectations" rating at year end, I wanted to work in an area where I was familiar with more of the stack.
</div>

<div class="role-card">

### Software Engineer - Facebook Search (Mar 2025 – May 2026)
Facebook Search was going through a phase of rapid growth, as an ambitious proposal — which included a good amount of headcount — had just been approved and funded by leadership.
I spoke to the managers of a few teams here, and felt excited about the opportunity on the Retrieval team, where the work was focused on picking more **relevant** & **engaging** results from Facebook's huge inventory of posts based on the search term.

The reality was a bit less comfortable.

As soon as I joined in the middle of H1 2025, I was tasked with collaborating with the Threads team and bringing some of the more state-of-the-art search technologies from Facebook to it, as my onboarding project.
It was meant to be relatively straightforward, as the deep layers of Meta's infra meant that the implementations were largely simple configuration changes.
However, we underestimated the many nuanced product & usage differences between the products, and the changes required many experiments and iterations to get right.
Compounded by the internal tooling differences and the slow feedback loop of having to wait days to see A/B test results, the project took all the rest of H1.
Despite hitting the official goals, it took a lot of the fun and energy out of me.

I talked to my manager Devin about the struggles, and we worked out a better plan for H2.
On the capacity savings front, Chun-Ho had a great idea of caching some retrieval results, which I took on to execute.
The idea was simple, but getting all the way to launching it took many rounds of implementation → experiments → review cycles, and some of the reviews had what I felt were unnecessary pushbacks. Even after launching, this change was mistakenly suspected for a number of incidents, which all fell on me to address. The launched version ended up being a lot more conservative and didn't yield as many savings as it otherwise could have.

On the product front, I took the simple direction of "Personalization", did some research, expanded it into a fully scoped roadmap, and convinced a couple people to work on it with me. Despite only starting in August, we quickly got into a cadence, forming, validating, and testing one hypothesis after the next, and launched a few valuable changes. However, possibly due to noisy metrics, or possibly due to the launch of a few big features in other work streams, the overall effect of the personalization effort did not show up nearly as strongly as the individual changes suggested.

The only work that I felt a little more in control of was helping to reduce a number of models' peak inference failure rate from ~10% down to <1%. This was a pure system-level debugging exercise that I was able to get through with high precision & confidence. I suspect this was also the work that got me scraping by a "Meeting Expectations" at the year end.

</div>

## Exit
After two full years on two different teams, still feeling like I couldn't contribute as much as I thought I was capable of, I took some time to explore external opportunities during my second parental leave. I got lucky again on the timing, and received an offer from Anthropic that was rather difficult to turn down, so I accepted it.

At Meta, it's customary to write a "Badge Post" (posting a picture of the badge, hence the name), prior to departure. Here's the first part of what I wrote.

<div class="role-card">

### Badge Post - a bittersweet end of an underwhelming journey

In all honesty, I don't feel like I'm deserving of a badge post.

Every day, there are people leaving, and many of them just walk away. Somehow I always felt a badge post was like a hero's farewell - you've got to have done something special to deserve it. And I haven't.

Sadly, this is the sentiment that epitomized my two years of struggles at Meta - a constant feeling of not being good enough.

For a multitude of reasons, I never truly felt comfortable.

On Wearables Productivity & Infra, being a complete novice in Android & firmware, I wasn't able to effectively connect & collaborate with the customers we served. The project I worked on had to be done for historical reasons, but was, at times, difficult to find convincing motivations.

On Search, I got stuck in the trap of farming incremental metric improvements based on noisy signals, without deep understanding of either the search domain or the system. I wasn't able to get myself involved in a more systematic, transformative project, yet experiment reviews frequently felt as exhausting as a Ph.D. thesis defense.

The domestic challenges of a toddler transitioning to day care, the health and social implications that came with it, meant that I was rarely at my full tank of energy at work.

I don't know exactly what burnout is, but this feels pretty close.

As a result, I found myself seeking comfort in a more familiar environment in the startup world for my mental health, and May 18, 2026 will be my last day at Meta. I'll be in the office and open to chat - BUR in the morning and MPK-20 in the afternoon.
</div>

## Takeaways
- Meta has a rather unique engineering culture, with individual performance deeply ingrained in every engineer's decision-making every day. For product teams in particular, performance is tightly coupled with quantitative metrics coming from well-established A/B tests, hence they are vigorously optimized, almost at all costs. I had read [this detailed blog series](https://newsletter.pragmaticengineer.com/p/facebook) prior to my joining, but it still took me a long time to normalize it.
- I was exposed to the internals of some **very cool technologies** here, many of which stemmed from the necessity to deal with true planet scale.
From source control to IDE, from stream processing libraries to ML-based test selection, from one of the world's largest document indices to the container orchestration framework, from the comprehensive A/B testing platform to ML model training CLI, so many tools Meta engineers rely on every day and take for granted were all very well built and could each be a company's main product on its own.
- Overall, through the two challenging years at Meta, I feel I've become more resilient in getting through difficult times.
- As an added bonus, I found out that Boris Cherny, the creator of Claude Code, was at Meta for seven years. Before he left, he wrote a few long posts detailing his career & projects at Meta. His posts were an incredibly inspiring read, and also what got me started on this site.


## People
- I'm extremely thankful for the incredible support my managers [Lei](https://www.linkedin.com/in/leiliang/), [Xintao](https://www.linkedin.com/in/xintao-chen-4a068969/), [Olusanya](https://www.linkedin.com/in/olusanya-soyannwo-9129014/), [Neil](https://www.linkedin.com/in/neil-newman-456b0949/), and [Devin](https://www.linkedin.com/in/shuai-ding-56210814/) have given me throughout my time at Meta.
- I got to work with so many capable engineers whose skills and talent I witnessed and admired every day. [Jessie](https://www.linkedin.com/in/jessie-wang-a35bb69b/), [Amy](https://www.linkedin.com/in/yuruo-zeng-6bb65186/), [Carlos](https://www.linkedin.com/in/carlos-saravia/), [Chris](https://www.linkedin.com/in/christoffles/), [Jack](https://www.linkedin.com/in/jackcheu/), [Chan](https://www.linkedin.com/in/youngchan992/), [Chi](https://www.linkedin.com/in/chi-zhang-597986b0/), [Zhiying](https://www.linkedin.com/in/zhiyingcui0630/?locale=en), [Leo](https://www.linkedin.com/in/leo-zhou-53749870/), [Mark](https://www.linkedin.com/in/mark-babumoses-1022839/), [Jie](https://www.linkedin.com/in/jielisheinman/), [Larry](https://www.linkedin.com/in/larrychau/), [Chiyao](https://www.linkedin.com/in/chiyao-s-29088bb4/), [Hao](https://www.linkedin.com/in/haofuphd/), [Zoe](https://www.linkedin.com/in/zhecai/), [Peihong](https://www.linkedin.com/in/peihongchai/), [Airei](https://www.linkedin.com/in/airei787/), [Chaojie](https://www.linkedin.com/in/chaojieou/), [Roland](https://www.linkedin.com/in/roland-liu/), [Chun-Ho](https://www.linkedin.com/in/chun-ho-ng-a25194133/) were just a few whom I worked most closely with on my team.
- I learned a great deal from many other cross-team partners too, notably: [Chongguang](https://www.linkedin.com/in/chongguang-liu-481246a4/), [Ruixiao](https://www.linkedin.com/in/ruixiaoyu/), [Omar](https://www.linkedin.com/in/omar-essam-6595a0137/), [Xuanyu](https://www.linkedin.com/in/yaoxuanyu/), [Richard](https://www.linkedin.com/in/richard-veitch-24a9b51b/), [Kazu](https://www.linkedin.com/in/pco2699/), [German](https://www.linkedin.com/in/3ginger/), [Bruce](https://www.linkedin.com/in/ruiyang-lin/), [Raphael](https://www.linkedin.com/in/raphael-bargues/), [Lanny](https://www.linkedin.com/in/lanny-xie-35916b128/), [Brian](https://www.linkedin.com/in/brian-tsau/), [Alanna](https://www.linkedin.com/in/alanna-tempest/), [Brian](https://www.linkedin.com/in/brian-kennedy-in-sea/), [Yungchun](https://www.linkedin.com/in/yungchun-hu-0a8a8aa4/), [Alex](https://www.linkedin.com/in/alexanderlar/), [Vikas](https://www.linkedin.com/in/videshpande/), [Rob](https://www.linkedin.com/in/robert-parkin-o-brien/), [Mohamed](https://www.linkedin.com/in/banna1/), [Jeffrey](https://www.linkedin.com/in/jeffreyeffendy/), [Vincente](https://www.linkedin.com/in/vciancio/), [Yujie](https://www.linkedin.com/in/yujie-wang-01116582/), [Yu-Wei](https://www.linkedin.com/in/yu-wei-wu/), [Matthew](https://www.linkedin.com/in/0matthewli/), [Emy](https://www.linkedin.com/in/emy-sun-a2bb081b/), [Cheng](https://www.linkedin.com/in/cheng-lu-8700122/), [Michael](https://www.linkedin.com/in/michael-menz-b5636a143/), [Alex](https://www.linkedin.com/in/zhiling-huang/), [Yadi](https://www.linkedin.com/in/yadollah-rasekhipour/), [Chen](https://www.linkedin.com/in/cavenyang/), [Frankie](https://www.linkedin.com/in/frankie-d-261b15184/), [Ying](https://www.linkedin.com/in/yingxie-eng/), [Jianqi](https://www.linkedin.com/in/jianqi-wang-20aaa444/), [Xiaobo](https://www.linkedin.com/in/xiaobo-zhang-bb31562b/), [Max](https://www.linkedin.com/in/maxkatsev/), [Lucian](https://www.linkedin.com/in/luciangrijincu/).
