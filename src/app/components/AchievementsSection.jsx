"use client"
import { useState, useEffect } from "react"

const achievementsList = [
  {
    metric: "Years",
    value: "5",
  },
  {
    metric: "Awards",
    value: "7",
  },
  {
    metric: "Projects",
    value: "100",
    postfix: "+",
  },
  {
    prefix: "~",
    metric: "Users",
    value: "100",
  },
]

const CountingNumber = ({ target, duration = 2000, prefix = "", postfix = "" }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const targetNum = parseInt(target)
    const increment = targetNum / (duration / 16) // 60fps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= targetNum) {
        setCount(targetNum)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [target, duration])

  const formatNumber = (num) => {
    return num.toLocaleString('en-US')
  }

  return (
    <span className="tabular-nums">
      {prefix}{formatNumber(count)}{postfix}
    </span>
  )
}

const AchievementsSection = () => {
  const [startAnimation, setStartAnimation] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimation(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
      <div className="sm:border-[#33353F] sm:border rounded-md py-8 px-16 flex flex-col sm:flex-row items-center justify-between">
        {achievementsList.map((achievement, index) => {
          return (
            <div key={index} className="flex flex-col items-center justify-center mx-4 my-4 sm:my-0">
              <h2 className="text-white text-4xl font-bold flex flex-row">
                {startAnimation ? (
                  <CountingNumber
                    target={achievement.value}
                    duration={2000 + index * 200}
                    prefix={achievement.prefix}
                    postfix={achievement.postfix}
                  />
                ) : (
                  <span>
                    {achievement.prefix}0{achievement.postfix}
                  </span>
                )}
              </h2>
              <p className="text-[#ADB7BE] text-base">{achievement.metric}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AchievementsSection