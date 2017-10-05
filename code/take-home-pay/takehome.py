# calculating tax liability (income tax and national insurance) and take home pay

def takehome(salary):
    gross = salary
    liability = 0

    lowerthreshold = 153*52
    upperthreshold = 805*52

    if gross > upperthreshold:
        upper = salary - upperthreshold
        lower = salary - upper - lowerthreshold
        liability = (upper * 0.02) + (lower * 0.12)
    elif gross > lowerthreshold:
        lower = salary - lowerthreshold
        liability = (lower * 0.12)
    else:
        return

    
    # tax rates
    basicRate = 0.8
    higherRate = 0.6
    additionalRate = 0.55
    
    # thresholds
    personal = 10000
    higher = 31866 + personal
    over = 100000
    additional = 150001 + personal

    if gross < 10000:
        return(gross-liability/12)
    elif gross<higher:
        return((((gross-personal)*basicRate)+personal - liability)/12)
    elif gross<over:
        upper = gross - higher
        print("upper = " + str(upper))
        lower = gross - upper - personal
        print("lower = " + str(lower))
        print("liability = " + str(liability))
        return( ((upper*higherRate) + (lower*basicRate) + personal - liability)/12 )
    elif gross<additional:
        diff = gross - over

        if diff <= personal * 2:
            personal = personal - (diff/2)
        else:
            personal = 0

        upper = gross - (higher - diff/2)
        lower = gross - upper - personal
        print(lower, upper, personal, liability)
        return( ((upper*higherRate) + (lower*basicRate) + personal - liability)/12 )
    else:
        diff = gross - over

        if diff <= personal * 2:
            personal = personal - (diff/2)
        else:
            personal = 0


        excess = (gross - additional)*additionalRate
        upper = (gross - excess - higher)*higherRate
        lower = (gross - upper - excess - personal)*basicRate
        print(lower, upper, personal, liability)
        return( (excess + upper + lower + personal - liability)/12 )

    
# everything between £153 and £805 12%
# everything over £805 2%

def ni(salary):
    lowerthreshold = 153*52
    upperthreshold = 805*52

    if salary > upperthreshold:
        upper = salary - upperthreshold
        lower = salary - upper - lowerthreshold
        liability = (upper * 0.02) + (lower * 0.12)
        return(liability)
    elif salary > lowerthreshold:
        lower = salary - lowerthreshold
        liability = (lower * 0.12)
        return(liability)
    else:
        return

def personalAllowance(salary):
    personal = 0
    if salary <= 100000:
        personal = 10000
    else:
        diff = salary - 100000
        if diff < 20000:
            personal = 10000 - (diff/2)
        else:
            personal = 0
    return(personal)

def basicLiability(salary, personalAllowance):
    if salary - personalAllowance > 0 and salary - personalAllowance < 31866:
        return(salary-personalAllowance)

def salaryBreakdown(salary):
    personal = personalAllowance(salary)
    basic = basicLiability(salary, personal)
    print(personal, basic)