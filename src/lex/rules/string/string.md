# all kind of strings

raw/escape
non-interpolate/interpolate
long / short

long string ( can be multiple lines)
    long raw string
      long raw interpolate string
        """ ... """
      long raw non-interpolate string
        ''' ... '''

    long escape string
      long escape non-interpolate string
        '...'
      long escape interpolate string
        "..."

    long interpolate string
      long interpolate escape string
        " ... "
      long interpolate raw string
        """ ... """

short string ( can not be multiple lines)
    short raw string
      short raw interpolate string
        s""" ... """
      short raw non-interpolate string
        s''' ... '''

    short escape string
      short escape non-interpolate string
        s'...'
      short escape interpolate string
        s"..."

    short interpolate string
      short interpolate escape string
        s" ... "
      short interpolate raw string
        s""" ... """

